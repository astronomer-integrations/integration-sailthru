const moment = require('moment');

const UserWithoutEmail = {
  anonymousId: '507f191e810c19729de860ea',
  channel: 'browser',
  context: {
    ip: '8.8.8.8',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
  },
  integrations: {
    All: false,
    Mixpanel: true,
    Salesforce: true,
  },
  messageId: '022bb90c-bbac-11e4-8dfc-aa07a5b093db',
  receivedAt: '2015-02-23T22:28:55.387Z',
  sentAt: '2015-02-23T22:28:55.111Z',
  timestamp: '2015-02-23T22:28:55.111Z',
  traits: {
    name: 'Peter Gibbons',
    plan: 'premium',
    logins: 5,
    address: {
      street: '6th St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'USA',
    },
  },
  type: 'identify',
  userId: '97980cfea0067',
  version: '1.1',
};

const UserWithEmail = {
  anonymousId: '507f191e810c19729de860ea',
  channel: 'browser',
  context: {
    ip: '8.8.8.8',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
  },
  integrations: {
    All: false,
    Mixpanel: true,
    Salesforce: true,
  },
  messageId: '022bb90c-bbac-11e4-8dfc-aa07a5b093db',
  receivedAt: '2015-02-23T22:28:55.387Z',
  sentAt: '2015-02-23T22:28:55.111Z',
  timestamp: '2015-02-23T22:28:55.111Z',
  traits: {
    name: 'Peter Gibbons',
    plan: 'premium',
    logins: 5,
    address: {
      street: '6th St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'USA',
    },
    email: 'thing@thing2y.com',
  },
  type: 'identify',
  userId: '97980cfea0067',
  version: '1.1',
};


const NewUser = {
  anonymousId: '507f191e810c19729de860ea',
  channel: 'browser',
  context: {
    ip: '8.8.8.8',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
  },
  integrations: {
    All: false,
    Mixpanel: true,
    Salesforce: true,
  },
  messageId: '022bb90c-bbac-11e4-8dfc-aa07a5b093db',
  receivedAt: '2015-02-23T22:28:55.387Z',
  sentAt: '2015-02-23T22:28:55.111Z',
  timestamp: '2015-02-23T22:28:55.111Z',
  traits: {
    name: 'Peter Gibbons',
    plan: 'premium',
    logins: 5,
    address: {
      street: '6th St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'USA',
    },
  },
  type: 'identify',
  userId: moment().format('HHDDMMmm'),
  version: '1.1',
};

const UserWithDefaults = {
  anonymousId: '507f191e810c19729de860ea',
  channel: 'browser',
  context: {
    ip: '8.8.8.8',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
  },
  integrations: {
    Sailthru: {
      defaultListName: 'custom-list',
      optoutValue: 'blast',
    },
  },
  messageId: '022bb90c-bbac-11e4-8dfc-aa07a5b093db',
  receivedAt: '2015-02-23T22:28:55.387Z',
  sentAt: '2015-02-23T22:28:55.111Z',
  timestamp: '2015-02-23T22:28:55.111Z',
  traits: {
    name: 'Peter Gibbons',
    plan: 'premium',
    logins: 5,
    address: {
      street: '6th St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'USA',
    },
  },
  type: 'identify',
  userId: moment().format('HHDDMMmm'),
  version: '1.1',
};

module.exports = {
  UserWithoutEmail,
  UserWithEmail,
  NewUser,
  UserWithDefaults,
};
