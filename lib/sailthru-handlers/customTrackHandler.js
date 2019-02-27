const {
  getPropertiesAfterRemovingPII,
  getUserId,
} = require('./helpers');

const {
  getEmailFromUserID,
} = require('./api');

module.exports = async (track, facadeOptions) => {
  const email = await getEmailFromUserID(track, facadeOptions);
  const data = {
    event: track.event(),
    id: getUserId(track),
    key: 'extid',
  };
  // Remove PII from properties
  const properties = getPropertiesAfterRemovingPII(track, facadeOptions);

  // Map all properties to `vars`
  const eventData = Object.assign({}, data, { vars: properties });

  return eventData;
};
