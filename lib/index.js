const moment = require('moment');
const stringify = require('json-stringify-safe');

const {
  generateSailthruTrackObject,
  generateSailthruIdentifyObject,
  generateSailthruPageObject,
  sendEventToAPI,
} = require('./sailthru-handlers');
const logging = require('./logging');

/**
 * Expose `Sailthru`.
 */

class Sailthru {
  constructor(options) {
    this.facadeOptions = options;
    this.logger = logging(options);
  }

  async _sendEvent(type, event, originalTrack) {
    const sendEventResponse = await sendEventToAPI(event, this.facadeOptions, originalTrack);
    if (this.facadeOptions && this.facadeOptions.loggingSentRequests) {
      this.logger.logEvent({
        sentAt: moment().format('MM-DD-YYYY HH:mm'),
        action: type,
        track: stringify(originalTrack),
        sentData: stringify(sendEventResponse && sendEventResponse.axiosData),
        forwarderOptions: stringify(this.facadeOptions),
        response: sendEventResponse.res && sendEventResponse.res.status ? stringify(sendEventResponse.res.status) : null,
        error: sendEventResponse.error && sendEventResponse.error.response && sendEventResponse.error.response.data ? stringify(sendEventResponse.error.response.data) : null,
      });
    }
    return sendEventResponse;
  }

  initialize() {}

  loaded() {
    return true;
  }

  enabled() {
    return true;
  }

  retry() {
    return false;
  }

  batch() {}

  async track(track, done) {
    const processedEvent = await generateSailthruTrackObject(track, this.facadeOptions);
    const response = await this._sendEvent('track', processedEvent, track);
    return done(response.error, response.res);
  }

  async page(track, done) {
    const processedEvent = generateSailthruPageObject(track, this.facadeOptions);
    const response = await this._sendEvent('page', processedEvent, track);
    return done(response.error, response.res);
  }

  async identify(track, done) {
    const processedEvent = await generateSailthruIdentifyObject(track, this.facadeOptions);
    const response = await this._sendEvent('identify', processedEvent, track);
    return done(response.error, response.res);
  }
}

module.exports = options => new Sailthru(options);
