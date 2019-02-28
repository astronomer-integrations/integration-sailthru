const {
  getUrl,
  getTags,
  getUserId,
} = require('./helpers');

module.exports = (track) => {
  const properties = {
    userIdKey: 'extid',
    userIdValue: getUserId(track),
    url: getUrl(track),
    tags: getTags(track),
  };

  return properties;
};
