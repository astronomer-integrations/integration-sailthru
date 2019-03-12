const {
  getUrl,
  getTags,
  getUserId,
} = require('./helpers');

module.exports = (track) => {
  const tags = getTags(track);
  const tagsString = (tags && tags.length) ? tags.join(',') : undefined;

  const properties = {
    userIdKey: 'extid',
    userIdValue: getUserId(track),
    url: getUrl(track),
    tags: tagsString,
    useStoredTags: (tags && tags.length),
  };

  return properties;
};
