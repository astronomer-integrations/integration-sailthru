const { Track } = require('segmentio-facade');
const _ = require('lodash');
const flatten = require('flat');

function getValueFromProxy(track, proxy) {
  const value = track.proxy(proxy);
  if (_.isObject(value)) {
    if (_.isEmpty(value)) {
      return undefined;
    }
    return value;
  }
  if (value !== undefined && value !== null) {
    return value;
  }
  return undefined;
}

function getProductId(track) {
  return track.productId() || track.id() || track.sku() || null;
}

function getOrderId(track) {
  return track.orderId() || '';
}

function formatPrice(price) {
  return Math.round(price * 100);
}

function getProductURL(track, options, originalTrack) {
  const productId = getProductId(track);
  return getValueFromProxy(track, 'properties.url')
    || (getValueFromProxy(originalTrack, 'context.page.url') ? `${getValueFromProxy(originalTrack, 'context.page.url')}${productId}`
      : `${options.productBaseUrl}/${productId}`);
}

function getUrl(track) {
  return getValueFromProxy(track, 'properties.url') || getValueFromProxy(track, 'context.page.url');
}

function getEmail(track) {
  return track.email() || getValueFromProxy(track, 'traits.email') || getValueFromProxy(track, 'properties.email');
}

function getUserId(track) {
  return track.userId()
  || getValueFromProxy(track, 'properties.userId')
  || getValueFromProxy(track, 'properties.anonymousId')
  || getValueFromProxy(track, 'userId')
  || getValueFromProxy(track, 'anonymousId');
}

function getTags(track) {
  return getValueFromProxy(track, 'properties.tags');
}

function getPropertiesAfterRemovingPII(track, facadeOptions) {
  const PII = [
    'email',
    'firstName',
    'lastName',
    'gender',
    'city',
    'country',
    'phone',
    'state',
    'zip',
    'birthday',
  ];
  const whitelistPiiProperties = (facadeOptions && facadeOptions.whitelistPiiProperties) || [];
  const properties = track.properties();
  return _.omit(properties, _.difference(PII, whitelistPiiProperties));
}

function getProductCustomProperties(properties) {
  return _.omit(properties, [
    'url',
    'value',
    'quantity',
    'name',
    'price',
    'product_id',
    'id',
    'image_url',
    'image_url_thumb',
  ]);
}

function getProductDetails(product, options, originalTrack) {
  const details = {
    id: getProductId(product),
  };

  if (details.id) {
    // Map properties that do not match with a Sailthru product property to `vars` object.
    const properties = getPropertiesAfterRemovingPII(product, options);
    const vars = flatten(getProductCustomProperties(properties));

    Object.assign(details, {
      qty: product.quantity() || 1,
      title: product.name() || '',
      price: formatPrice(product.price() || product.value()) || 0,
      url: getProductURL(product, options, originalTrack),
      images: {
        full: {
          url: getValueFromProxy(product, 'properties.image_url'),
        },
        thumb: {
          url: getValueFromProxy(product, 'properties.image_url_thumb'),
        },
      },
      vars,
    });
    return details;
  }
  return null;
}

function getDetails(track, options) {
  const products = track.products() || [];

  if (products.length > 0) {
    return products.map((product) => {
      const t = new Track({ properties: product });

      return getProductDetails(t, options, track);
    }).filter(product => product); // filter out products without id
  }

  return getProductDetails(track, options, track);
}

function getCustomProperties(properties) {
  return _.omit(properties, [
    'price',
    'products',
    'product_id',
    'id',
    'sku',
    'qty',
    'tax',
    'discount',
    'shipping',
  ]);
}

function removeUndefinedFields(data) {
  const processedData = {};
  _.forEach(data, (value, key) => {
    if (value) {
      processedData[key] = value;
    }
  });
  return processedData;
}

function getAdjustments(track) {
  const tax = track.tax() || getValueFromProxy(track, 'properties.tax');
  const shipping = track.shipping() || getValueFromProxy(track, 'properties.shipping');
  const discount = track.discount() || getValueFromProxy(track, 'properties.discount');
  const adjustments = [];

  if (tax) {
    adjustments.push({
      title: 'tax',
      price: formatPrice(tax),
    });
  }
  if (shipping) {
    adjustments.push({
      title: 'shipping',
      price: formatPrice(shipping),
    });
  }
  if (discount) {
    adjustments.push({
      title: 'discount',
      price: -formatPrice(discount),
    });
  }

  return adjustments;
}

// Remove empty objects, null and undefined values
function processSailthruObject(obj) {
  const clearedObject = _.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    if (_.isObject(obj[key]) || _.isArray(obj[key])) {
      const processedObject = processSailthruObject(obj[key]);

      if (!_.isEmpty(processedObject)) {
        if (_.isArray(obj)) {
          clearedObject.push(processedObject);
        } else if (_.isObject(obj)) {
          clearedObject[key] = processedObject;
        }
      } else if (_.isArray(processedObject)) {
        clearedObject[key] = processedObject;
      }
    } else if (!_.isUndefined(obj[key]) && !_.isNull(obj[key])) {
      clearedObject[key] = obj[key];
    }
  });

  return clearedObject;
}

function generateEmptyChart(track) {
  return {
    email: getEmail(track),
    items: [],
    incomplete: 1,
  };
}

function getUpdatedChart(track, facadeOptions, originalChart) {
  const chart = _.cloneDeep(originalChart);
  const currentProduct = getDetails(track, facadeOptions);
  // check if the product is already in chart
  if (chart.items.find(p => p.id === currentProduct.id)) {
    return Object.assign(chart, {
      items: chart.items.map((product) => {
        if (product.id !== currentProduct.id) {
          return product;
        }
        // Calculate new quantity
        let newQty;
        if (facadeOptions.options.remove) {
          newQty = product.qty - currentProduct.qty;
        } else {
          newQty = product.qty + currentProduct.qty;
        }

        // Update the product
        return Object.assign({}, product, {
          vars: Object.assign({}, product.vars, flatten(currentProduct.vars)),
          qty: newQty,
        });
      }).filter(product => product.qty > 0),
    });
  }

  if (!facadeOptions.options.remove) {
    chart.items.push(currentProduct);
    return chart;
  }
  return chart;
}

function getListName(track, facadeOptions) {
  return getValueFromProxy(track, 'properties.defaultListName')
    || getValueFromProxy(track, 'traits.defaultListName')
    || getValueFromProxy(track, 'integrations.Sailthru.defaultListName')
    || facadeOptions.defaultListName;
}

function getOptoutValue(track, facadeOptions) {
  return getValueFromProxy(track, 'properties.optoutValue')
    || getValueFromProxy(track, 'integrations.Sailthru.optoutValue')
    || facadeOptions.optoutValue
    || 'none';
}

function getReminderTemplate(track, facadeOptions) {
  return getValueFromProxy(track, 'properties.reminderTemplate')
    || getValueFromProxy(track, 'integrations.Sailthru.reminderTemplate')
    || facadeOptions.reminderTemplate;
}

function getReminderTime(track, facadeOptions) {
  return `+${getValueFromProxy(track, 'properties.reminderTime')
  || getValueFromProxy(track, 'integrations.Sailthru.reminderTime')
  || facadeOptions.reminderTime}`;
}

function getSendTemplate(track, facadeOptions) {
  return getValueFromProxy(track, 'properties.sendTemplate')
  || getValueFromProxy(track, 'integrations.Sailthru.sendTemplate')
  || facadeOptions.sendTemplate;
}

module.exports = {
  getSendTemplate,
  getReminderTemplate,
  getReminderTime,
  getOptoutValue,
  getListName,
  getTags,
  getUrl,
  getUserId,
  formatPrice,
  getProductId,
  getProductDetails,
  getOrderId,
  getDetails,
  getEmail,
  getAdjustments,
  getPropertiesAfterRemovingPII,
  getCustomProperties,
  removeUndefinedFields,
  processSailthruObject,
  generateEmptyChart,
  getUpdatedChart,
  getProductURL,
};
