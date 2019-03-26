
const axios = require('axios');

const pageHandler = require('./pageHandler');
const identifyHandler = require('./identifyHandler');
const trackHandler = require('./trackHandler');
const customTrackHandler = require('./customTrackHandler');

const { prepareClientApiCall, preparePublicApiCall } = require('./api');

const EVENT_MAPPINGS = {
  // Native events that map to standard Sailthru
  OrderUpdated: { endpoint: '/purchase', options: { incomplete: 1 } },
  OrderCompleted: { endpoint: '/purchase', options: { incomplete: 0 } },
  ProductAdded: { endpoint: '/purchase', options: { incomplete: 1, productOnly: true } },
  ProductRemoved: { endpoint: '/purchase', options: { incomplete: 1, productOnly: true, remove: true } },
};

async function generateSailthruTrackObject(track, facadeOptions) {
  const receivedEventName = track.event();
  let eventName = 'UnnamedEvent';

  if (receivedEventName) {
    eventName = track.event().split(' ').join('');
  }
  const eventMappings = Object.assign({}, EVENT_MAPPINGS, (facadeOptions && facadeOptions.additionalMappedEvents) || {});
  const mapping = eventMappings[eventName];
  const settings = {
    endpoint: (mapping && mapping.endpoint) || '/event',
    apiKey: facadeOptions.apiKey,
    secret: facadeOptions.secret,
    optoutValue: facadeOptions.optoutValue,
    sendTemplate: facadeOptions.sendTemplate,
    reminderTemplate: facadeOptions.reminderTemplate,
    reminderTime: facadeOptions.reminderTime,
    productBaseUrl: facadeOptions.productBaseUrl,
  };

  if (!mapping) {
    settings.options = { eventName };
  } else {
    settings.options = (mapping && mapping.options) || {};
  }
  const isEventMapped = !!mapping;

  return {
    mapped: isEventMapped,
    endpoint: settings.endpoint,
    data: isEventMapped ? await trackHandler(track, settings) : customTrackHandler(track, settings),
    publicApi: true,
  };
}

function generateSailthruPageObject(track) {
  return {
    mapped: true,
    event: 'PageView',
    data: pageHandler(track),
    publicApi: false,
    endpoint: '/pageview',
  };
}

function generateSailthruIdentifyObject(track, facadeOptions) {
  return {
    settings: {
      apiKey: facadeOptions.apiKey,
      secret: facadeOptions.secret,
    },
    mapped: true,
    endpoint: '/user',
    data: identifyHandler(track, facadeOptions),
    publicApi: true,
  };
}

async function sendEventToAPI(processedEvent, facadeOptions, originalTrack) {
  if (processedEvent.data && processedEvent.data.error) {
    return processedEvent.data;
  }

  const { config, url, axiosData } = processedEvent.publicApi
    ? preparePublicApiCall(processedEvent, facadeOptions)
    : prepareClientApiCall(processedEvent, facadeOptions);

  if (originalTrack.proxy('context.ip')) {
    config.ip = originalTrack.proxy('context.ip');
  } else if (facadeOptions.userIP) {
    config.ip = facadeOptions.userIP;
  }

  try {
    const APIresponse = await axios.post(url, axiosData, config);
    const response = {
      axiosData,
      res: (APIresponse.data && APIresponse.data.error) ? null : APIresponse,
      error: (APIresponse.data && APIresponse.data.error) ? APIresponse.data.error : null,
    };
    return response;
  } catch (error) {
    const response = {
      axiosData,
      res: null,
      error,
    };
    return response;
  }
}

module.exports = {
  generateSailthruPageObject,
  generateSailthruTrackObject,
  generateSailthruIdentifyObject,
  sendEventToAPI,
};
