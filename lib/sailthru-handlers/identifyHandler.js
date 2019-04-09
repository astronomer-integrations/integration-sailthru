const _ = require('lodash');
const flatten = require('flat');
const {
  getEmail,
  getUserId,
  getListName,
  getOptoutValue,
  getAnonymousId,
} = require('./helpers');

const { getSailthruProfile } = require('./api');

module.exports = async (track, facadeOptions) => {
  // firstly, check if the user has events with annonymous id

  const userProfile = await getSailthruProfile(track, facadeOptions, true);
  const data = {};

  if (userProfile.res) {
    Object.assign(data, {
      id: getAnonymousId(track),
      keys: {
        email: getEmail(track),
        extid: getUserId(track),
      },
    });
  } else {
    Object.assign(data, {
      id: getUserId(track),
      keys: {
        email: getEmail(track),
      },
    });
  }

  Object.assign(data, {
    key: 'extid',
    optout_email: getOptoutValue(track, facadeOptions),
    keysconflict: 'merge',
  });

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

  return Object.assign(data, { vars: flatten(traits) });
};
