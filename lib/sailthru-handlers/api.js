const axios = require('axios');
const crypto = require('crypto');
const _ = require('lodash');
const querystring = require('querystring');

const {
  generateEmptyChart,
  processSailthruObject,
  getUserId,
} = require('./helpers');

const apiBaseURL = 'https://api.sailthru.com';

function generateSig(data, facadeOptions) {
  const concatenatedValues = `${facadeOptions.secret}${facadeOptions.apiKey}json${JSON.stringify(data)}`;

  return crypto
    .createHash('md5')
    .update(concatenatedValues)
    .digest('hex');
}

function preparePublicApiCall(processedEvent, facadeOptions) {
  let eventToSend = {};

  if (processedEvent.data) {
    eventToSend = Object.assign(eventToSend, processSailthruObject(processedEvent.data));
  }

  const sig = generateSig(eventToSend, facadeOptions);
  const url = `${apiBaseURL}${processedEvent.endpoint}`;

  const axiosData = {
    api_key: facadeOptions.apiKey,
    sig,
    format: 'json',
    json: JSON.stringify(eventToSend),
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return {
    url,
    axiosData: querystring.stringify(axiosData),
    config,
  };
}

function prepareClientApiCall(processedEvent, facadeOptions) {
  const url = `https://api.sail-track.com/v1/track/event${processedEvent.endpoint}`;

  let eventToSend = {};

  if (processedEvent.data) {
    eventToSend = Object.assign(eventToSend, processSailthruObject(processedEvent.data));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${facadeOptions.clientId}`,
    },
  };

  return {
    url,
    axiosData: eventToSend,
    config,
  };
}

// Get or create a sailthru profile.
async function getSailthruProfile(track, facadeOptions) {
  const userId = getUserId(track);
  if (!userId) {
    return {
      error: 'User Id not set',
      res: null,
      axiosData: null,
    };
  }

  const data = {
    id: userId,
    key: 'extid',
    fields: {
      purchase_incomplete: 1,
      keys: 1,
    },
  };
  const sig = generateSig(data, facadeOptions);
  const params = {
    api_key: facadeOptions.apiKey,
    sig,
    format: 'json',
    json: data,
  };

  try {
    const apiResponse = await axios.get(`${apiBaseURL}/user`, { params });
    const response = {
      axiosData: params,
      res: (apiResponse.data && apiResponse.data.error) ? null : apiResponse,
      error: (apiResponse.data && apiResponse.data.error) ? apiResponse.data.error : null,
    };
    return response;
  } catch (error) {
    const response = {
      axiosData: params,
      res: null,
      error,
    };

    return response;
  }
}


async function getEmailFromUserID(track, facadeOptions) {
  const profile = await getSailthruProfile(track, facadeOptions);
  if (profile.error) {
    return profile;
  }

  if (!profile.res || !profile.res.data || !profile.res.data.keys) {
    return undefined;
  }
  return profile.res.data.keys.email;
}

async function getUserChart(track, facadeOptions) {
  const profile = await getSailthruProfile(track, facadeOptions);
  if (profile.error) {
    return profile;
  }

  if (!profile.res || !profile.res.data || !profile.res.data.purchase_incomplete) {
    return generateEmptyChart(track);
  }
  const chartData = profile.res.data.purchase_incomplete;

  return _.pick(chartData, [
    'items',
    'vars',
    'adjustments',
  ]);
}


module.exports = {
  getSailthruProfile,
  getEmailFromUserID,
  generateSig,
  getUserChart,
  prepareClientApiCall,
  preparePublicApiCall,
};
