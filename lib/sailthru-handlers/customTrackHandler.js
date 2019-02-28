const {
  getPropertiesAfterRemovingPII,
  getUserId,
} = require('./helpers');

module.exports = (track, facadeOptions) => {
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
