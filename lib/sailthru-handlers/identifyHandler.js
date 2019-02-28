const _ = require('lodash');
const {
  getEmail,
  getUserId,
  getListName,
  getOptoutValue,
} = require('./helpers');

module.exports = (track, facadeOptions) => {
  const data = {
    id: getUserId(track),
    key: 'extid',
    keys: {
      email: getEmail(track),
    },
    optout_email: getOptoutValue(track, facadeOptions),
    keysconflict: 'merge',
  };

  if (getListName(track, facadeOptions)) {
    Object.assign(data, { lists: { [getListName(track, facadeOptions)]: 1 } });
  }

  // assign traits to `vars` property
  const traits = _.omit(track.traits(), [
    'email',
    'defaultListName',
    'optout_email',
    'id',
    'userId',
    'annonymousId',
  ]);

  return Object.assign(data, { vars: Object.assign({}, traits) });
};
