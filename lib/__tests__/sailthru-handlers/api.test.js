/**
 * @jest-environment node
 */

const { Track } = require('segmentio-facade');

const {
  getUserChart,
  getEmailFromUserID,
  getSailthruProfile,
} = require('../../sailthru-handlers/api');

const { FacadeOpts } = require('../../__test_options__/options');

const {
  ProductAdded,
  ProductReviewed,
} = require('../../__test_data__/mappedEvents');

const {
  NewUser,
} = require('../../__test_data__/mappedUsers');

describe('---- getUserChart tests ----', () => {
  test('should return an users chart', async () => {
    const track = new Track(ProductAdded, FacadeOpts);
    const userChart = await getUserChart(track, FacadeOpts);
    expect(userChart).toBeDefined();
  });
});

describe('---- getEmailFromUserID ----', () => {
  test('should return undefined', async () => {
    const track = new Track(ProductReviewed, FacadeOpts);
    const userEmail = await getEmailFromUserID(track, FacadeOpts);
    expect(userEmail).toBeUndefined();
  });
});

describe('---- getSailthruProfile ----', () => {
  test('should return a new user profile', async () => {
    const track = new Track(NewUser, FacadeOpts);
    const userProfile = await getSailthruProfile(track, FacadeOpts);
    expect(userProfile.error).toBeDefined();
  });
});
