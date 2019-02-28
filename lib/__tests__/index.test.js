/**
 * @jest-environment node
 */

const {
  Identify,
  // Track,
} = require('segmentio-facade');

const { FacadeOpts } = require('../__test_options__/options');
// const {
//   // OrderCompleted,
//   // OrderUpdated,
// ProductAdded,
//   // ProductRemoved,
//   // CartViewed,
//   PageView,
// } = require('../__test_data__/mappedEvents');

const {
  UserWithoutEmail,
  UserWithEmail,
} = require('../__test_data__/mappedUsers');

const Analytics = require('../index');

describe('---- main index ----', () => {
  // test('OrderCompleted', () => {
  //   const track = new Track(OrderCompleted, { type: 'event' });
  //   const analytics = Analytics(FacadeOpts);
  //   analytics.track(track);
  // });

  // test('OrderUpdated', () => {
  //   const track = new Track(OrderUpdated, { type: 'event' });
  //   const analytics = Analytics(FacadeOpts);
  //   analytics.track(track);
  // });

  // test('Product Added', () => {
  //   const track = new Track(ProductAdded, { type: 'event' });
  //   const analytics = Analytics(FacadeOpts);
  //   analytics.track(track);
  // });

  // test('Product Removed', () => {
  //   const track = new Track(ProductRemoved, { type: 'event' });
  //   const analytics = Analytics(FacadeOpts);
  //   analytics.track(track);
  // });

  // test('CardViewd (custom event)', () => {
  //   const track = new Track(CartViewed, { type: 'event' });
  //   const analytics = Analytics(FacadeOpts);

  //   analytics.track(track);
  // });

  // test('Page View', () => {
  //   const track = new Track(PageView, { type: 'event' });
  //   const analytics = Analytics(FacadeOpts);

  //   analytics.page(track);
  // });
  afterAll((done) => {
    setTimeout(() => done(), 10000);
  });
});


describe('Identify', () => {
  test('should create an user without email', () => {
    const track = new Identify(UserWithoutEmail, { type: 'identify' });
    const analytics = Analytics(FacadeOpts);

    analytics.identify(track, (err, res) => {
      console.log(err ? err.response.data : res.data);
    });
  });
  test('should update the user\'s email', () => {
    const track = new Identify(UserWithEmail, { type: 'identify' });
    const analytics = Analytics(FacadeOpts);

    analytics.identify(track, (err, res) => {
      console.log(err ? err.response.data : res.data);
    });
  });
  afterAll((done) => {
    setTimeout(() => done(), 10000);
  });
});

describe('Create an account and add a product to cart', () => {
  // test('1. Add products', () => {
  //   const track = new Track(ProductAdded, { type: 'event' });
  //   const analytics = Analytics(FacadeOpts);

  //   analytics.track(track);
  // });
  // test('2. Identify the user', () => {
  //   Object.assign(UserWithEmail, { userId: ProductAdded.userId });
  //   const identify = new Identify(UserWithEmail, { type: 'identify' });
  //   const analytics = Analytics(FacadeOpts);

  //   analytics.identify(identify);
  // });
  afterAll((done) => {
    setTimeout(() => done(), 10000);
  });
});
