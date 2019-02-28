const CustomEvent1 = {
  event: 'Custom Event',
  userId: '1234567890',
  properties: {
    custom_field_1: 'value_for_custom_field_1',
    custom_field_2: 20,
    custom_field_3: [],
    custom_field_4: {},
    checkinDate: '2015-02-23T22:28:55.111Z',
    email: 'roxana@appscend.com',
    list_id: 'hot_deals_1',
    category: 'Deals',
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        position: 1,
        category: 'Games',
        url: 'https://www.example.com/product/path',
        image_url: 'https://www.example.com/product/path.jpg',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        position: 2,
        category: 'Games',
      },
    ],
  },
};

const CustomEvent2 = {
  event: 'Custom Event 2',
  userId: '1234567890',
  properties: {
    custom_field_1: 'value_for_custom_field_1',
    custom_field_2: 20,
    custom_field_3: [],
    custom_field_4: {},
    checkinDate: '2015-02-23T22:28:55.111Z',
    email: 'roxana@appscend.com',
    list_id: 'hot_deals_1',
    category: 'Deals',
    promotion_id: 'promotion_id',
    id: 'id_2',
  },
};

const CustomEvent3 = {
  event: 'Custom Event 3',
  userId: '1234567890',
  properties: {
    custom_field_1: 'value_for_custom_field_1',
    custom_field_2: 20,
    custom_field_3: [],
    custom_field_4: {},
    checkinDate: '2015-02-23T22:28:55.111Z',
    email: 'roxana@appscend.com',
    list_id: 'hot_deals_1',
    category: 'Deals',
    promotion: 'promotion',
    sku: 'sku_3',
  },
};

const CustomEvent4 = {
  event: 'Custom Event 4',
  userId: '1234567890',
  properties: {
    custom_field_1: 'value_for_custom_field_1',
    custom_field_2: 20,
    custom_field_3: [],
    custom_field_4: {},
    currency: 'Lorem Ipsum',
    checkinDate: '2015-02-23T22:28:55.111Z',
    email: 'roxana@appscend.com',
    list_id: 'hot_deals_1',
    category: 'Deals',
    coupon_id: 'coupon_id',
  },
};

const UnnamedEvent = {
  userId: '1234567890',
  properties: {
    custom_field_1: 'value_for_custom_field_1',
    custom_field_2: 20,
    custom_field_3: [],
    custom_field_4: {},
    checkinDate: '2015-02-23T22:28:55.111Z',
    email: 'roxana@appscend.com',
    list_id: 'hot_deals_1',
    category: 'Deals',
    promotion_id: 'promotion_id',
    id: 'id_2',
  },
};

const EmptyEventName = {
  event: '',
  userId: '1234567890',
  properties: {
    custom_field_1: 'value_for_custom_field_1',
    custom_field_2: 20,
    custom_field_3: [],
    custom_field_4: {},
    checkinDate: '2015-02-23T22:28:55.111Z',
    email: 'roxana@appscend.com',
    list_id: 'hot_deals_1',
    category: 'Deals',
    promotion_id: 'promotion_id',
    id: 'id_2',
  },
};

const EmptyEvent = {};

module.exports = {
  CustomEvent1,
  CustomEvent2,
  CustomEvent3,
  CustomEvent4,
  UnnamedEvent,
  EmptyEventName,
  EmptyEvent,
};
