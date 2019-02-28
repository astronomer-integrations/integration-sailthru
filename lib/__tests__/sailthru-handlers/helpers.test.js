/**
 * @jest-environment node
 */

const { Track, Identify } = require('segmentio-facade');

const {
  getProductId,
  getOrderId,
  getProductDetails,
  processSailthruObject,
  getEmail,
  formatPrice,
  getUrl,
  getUserId,
  getSendTemplate,
  getReminderTemplate,
  getReminderTime,
  getOptoutValue,
  getListName,
} = require('../../sailthru-handlers/helpers');

const { FacadeOpts } = require('../../__test_options__/options');

const {
  ProductListViewed,
  ProductViewed,
  OrderCompleted,
  ProductClicked,
  CouponRemoved,
  ProductShared,
  ProductAdded,
} = require('../../__test_data__/mappedEvents');
const {
  CustomEvent2,
  CustomEvent3,
} = require('../../__test_data__/customEvents');

const {
  UserWithDefaults,
  NewUser,
} = require('../../__test_data__/mappedUsers');

describe('---- getProductId tests ----', () => {
  test('should return `null` for a track that does not have a `product_id`, `id` or `sku` set', () => {
    const track = new Track(OrderCompleted, FacadeOpts);
    const processedData = getProductId(track);

    expect(processedData).toBe(null);
  });
  test('should return data for a track that has `product_id` set', () => {
    const track = new Track(ProductViewed, FacadeOpts);
    const processedData = getProductId(track);

    expect(processedData).toBe('507f1f77bcf86cd799439011');
  });

  test('should return data for a track that has no `product_id` set, but has an `id` set', () => {
    const track = new Track(CustomEvent2, FacadeOpts);
    const processedData = getProductId(track);

    expect(processedData).toBe('id_2');
  });

  test('should return data for a track that has no `product_id` or `id` set, but has an `sku` set', () => {
    const track = new Track(CustomEvent3, FacadeOpts);
    const processedData = getProductId(track);

    expect(processedData).toBe('sku_3');
  });
});

describe('---- getOrderId tests ----', () => {
  test('should return data for a track that has an order id set', () => {
    const track = new Track(OrderCompleted, FacadeOpts);
    const processedData = getOrderId(track);

    expect(processedData).toBeDefined();
  });
  test('should return an empty string for a track that does not have an order id set', () => {
    const track = new Track(ProductViewed, FacadeOpts);
    const processedData = getOrderId(track);

    expect(processedData).toBe('');
  });
});


describe('---- getEmail tests ----', () => {
  test('should return an email from traits.email', () => {
    const track = new Track(OrderCompleted, FacadeOpts);
    const processedData = getEmail(track);

    expect(processedData).toBeDefined();
    expect(processedData).toBe('ade@telepat.io');
  });
});

describe('---- getProductDetails tests ----', () => {
  test('should return an object for a product passed', () => {
    const track = new Track(ProductListViewed, FacadeOpts);
    const products = track.products();
    const t = new Track({ properties: products[0] });
    const processedData = processSailthruObject(getProductDetails(t, {}, track));

    expect(processedData.id).toBeDefined();
    expect(processedData.id).toBe('507f1f77bcf86cd799439011');
    expect(processedData.price).toBeDefined();
    expect(processedData.price).toBe(1900);
    expect(processedData.qty).toBeDefined();
    expect(processedData.qty).toBe(1);
    expect(processedData.title).toBeDefined();
    expect(processedData.title).toBe('Monopoly: 3rd Edition');
    expect(processedData.url).toBeDefined();
    expect(processedData.url).toBe('https://www.example.com/product/path');
    expect(processedData.images.full.url).toBeDefined();
    expect(processedData.images.full.url).toBe('https://www.example.com/product/path.jpg');
    expect(processedData.images.thumb.url).toBeDefined();
    expect(processedData.images.thumb.url).toBe('https://www.example.com/product/path/thumb.jpg');
    expect(processedData.vars.category).toBeDefined();
    expect(processedData.vars.position).toBeDefined();
    expect(processedData.vars.position).toBe(1);
    expect(processedData.vars.sku).toBeDefined();
    expect(processedData.vars.sku).toBe('45790-32');
  });

  test('should return an object for a track with product details set on it', () => {
    const track = new Track(ProductViewed, FacadeOpts);
    const processedData = processSailthruObject(getProductDetails(track, {}, track));

    expect(processedData.id).toBeDefined();
    expect(processedData.id).toBe('507f1f77bcf86cd799439011');
    expect(processedData.price).toBeDefined();
    expect(processedData.price).toBe(1899);
    expect(processedData.qty).toBeDefined();
    expect(processedData.qty).toBe(1);
    expect(processedData.title).toBeDefined();
    expect(processedData.title).toBe('Monopoly: 3rd Edition');
    expect(processedData.url).toBeDefined();
    expect(processedData.url).toBe('https://www.example.com/product/path');
    expect(processedData.images.full.url).toBeDefined();
    expect(processedData.images.full.url).toBe('https://www.example.com/product/path.jpg');
    expect(processedData.vars.category).toBeDefined();
    expect(processedData.vars.position).toBeDefined();
    expect(processedData.vars.position).toBe(3);
    expect(processedData.vars.sku).toBeDefined();
    expect(processedData.vars.sku).toBe('G-32');
    expect(processedData.vars.brand).toBeDefined();
    expect(processedData.vars.brand).toBe('Hasbro');
    expect(processedData.vars.variant).toBeDefined();
    expect(processedData.vars.variant).toBe('200 pieces');
    expect(processedData.vars.coupon).toBeDefined();
    expect(processedData.vars.coupon).toBe('MAYDEALS');
  });
});

describe('---- formatPrice tests ----', () => {
  test('should return price in cents', () => {
    const price = formatPrice(19.99);
    expect(price).toBe(1999);
  });

  test('should return undefined', () => {
    const price = formatPrice(undefined);
    expect(price).toBeFalsy();
  });
});

describe('---- getProductURL tests ----', () => {

});

describe('---- getUrl tests ----', () => {
  test('should return url from properties', () => {
    const track = new Track(ProductClicked, FacadeOpts);
    const processedData = getUrl(track);
    expect(processedData).toBe('https://www.example.com/product/path');
  });

  test('should return url from context.page', () => {
    const track = new Track(CouponRemoved, FacadeOpts);
    const processedData = getUrl(track);
    expect(processedData).toBe('http://myurl.com');
  });
});

describe('---- getUserId tests ----', () => {
  describe('should return userId properties.userId', () => {
    const track = new Track(CouponRemoved, FacadeOpts);
    const processedData = getUserId(track);
    expect(processedData).toBe('1234567890');
  });

  describe('should return the anonymousId userId', () => {
    const track = new Track(ProductShared, FacadeOpts);
    const processedData = getUserId(track);
    expect(processedData).toBe('1234567890');
  });
});

describe('---- getTags tests ----', () => {

});

describe('---- getSendTemplate tests ----', () => {
  test('should return send template from facade opts', () => {
    const track = new Track(ProductAdded, FacadeOpts);
    const processedData = getSendTemplate(track, FacadeOpts);
    expect(processedData).toBe('send-template');
  });

  test('should return template from integrations object', () => {
    const track = new Track(ProductClicked, FacadeOpts);
    const processedData = getSendTemplate(track, FacadeOpts);
    expect(processedData).toBe('send');
  });
});

describe('---- getReminderTime tests ----', () => {
  test('should return send template from facade opts', () => {
    const track = new Track(ProductAdded, FacadeOpts);
    const processedData = getReminderTime(track, FacadeOpts);
    expect(processedData).toBe('+5 minutes');
  });

  test('should return template from integrations object', () => {
    const track = new Track(ProductClicked, FacadeOpts);
    const processedData = getReminderTime(track, FacadeOpts);
    expect(processedData).toBe('+10m');
  });
});

describe('---- getReminderTemplate tests ----', () => {
  test('should return send template from facade opts', () => {
    const track = new Track(ProductAdded, FacadeOpts);
    const processedData = getReminderTemplate(track, FacadeOpts);
    expect(processedData).toBe('reminder-template');
  });

  test('should return template from integrations object', () => {
    const track = new Track(ProductClicked, FacadeOpts);
    const processedData = getReminderTemplate(track, FacadeOpts);
    expect(processedData).toBe('reminder');
  });
});

describe('---- getOptoutValue tests ----', () => {
  test('should return send template from facade opts', () => {
    const identify = new Identify(NewUser, FacadeOpts);
    const processedData = getOptoutValue(identify, FacadeOpts);
    expect(processedData).toBe('all');
  });

  test('should return template from integrations object', () => {
    const identify = new Identify(UserWithDefaults, FacadeOpts);
    const processedData = getOptoutValue(identify, FacadeOpts);
    expect(processedData).toBe('blast');
  });
});

describe('---- getListName tests ----', () => {
  test('should return send template from facade opts', () => {
    const identify = new Identify(NewUser, FacadeOpts);
    const processedData = getListName(identify, FacadeOpts);
    expect(processedData).toBe('list2');
  });

  test('should return template from integrations object', () => {
    const identify = new Identify(UserWithDefaults, FacadeOpts);
    const processedData = getListName(identify, FacadeOpts);
    expect(processedData).toBe('custom-list');
  });
});

describe('---- getUpdatedChart tests ----', () => {

});

describe('---- generateEmptyChart tests ----', () => {

});

describe('---- processSailthruObject tests ----', () => {
});
