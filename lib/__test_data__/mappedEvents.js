const moment = require('moment');

const PageView = {
  anonymousId: '507f191e810c19729de860ea',
  channel: 'browser',
  context: {
    ip: '8.8.8.8',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
  },
  integrations: {
    All: true,
    Mixpanel: false,
    Salesforce: false,
  },
  messageId: '022bb90c-bbac-11e4-8dfc-aa07a5b093db',
  name: 'Home',
  properties: {
    title: 'Welcome | Initech',
    url: 'http://fasfa.com/testsdsd',
  },
  receivedAt: '2015-02-23T22:28:55.387Z',
  sentAt: '2015-02-23T22:28:55.111Z',
  timestamp: '2015-02-23T22:28:55.111Z',
  type: 'page',
  userId: 'onedamnuserid',
  version: '1.1',
};

const viewHome = {
  event: 'viewHome',
  userId: '1234567890',
};

const ProductsSearched = {
  event: 'Products Searched',
  userId: '1234567890',
  properties: {
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    query: 'blue pants',
  },
};

const ProductListViewed = {
  event: 'Product List Viewed',
  userId: '1234567890',
  properties: {
    list_id: 'hot_deals_1',
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        position: 1,
        category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
        url: 'https://www.example.com/product/path',
        image_url: 'https://www.example.com/product/path.jpg',
        image_url_thumb: 'https://www.example.com/product/path/thumb.jpg',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        position: 2,
        category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
        variant: 'variant value',
      },
    ],
  },
};

const ProductListFiltered = {
  event: 'Product List Filtered',
  userId: '1234567890',
  properties: {
    list_id: 'todays_deals_may_11_2016',
    filters: [
      {
        type: 'department',
        value: 'beauty',
      },
      {
        type: 'price',
        value: 'under-$25',
      },
    ],
    sorts: [
      {
        type: 'price',
        value: 'desc',
      },
    ],
    products: [
      {
        product_id: '507f1f77bcf86cd798439011',
        sku: '45360-32',
        name: 'Dove Facial Powder',
        price: 12.60,
        position: 1,
        category: 'Beauty',
        url: 'https://www.example.com/product/path',
        image_url: 'https://www.example.com/product/path.jpg',
      },
      {
        product_id: '505bd76785ebb509fc283733',
        sku: '46573-32',
        name: 'Artin Hairbrush',
        price: 7.60,
        position: 2,
        category: 'Beauty',
      },
    ],
  },
};

const PromotionViewed = {
  event: 'Promotion Viewed',
  userId: '1234567890',
  properties: {
    promotion_id: 'promo_1',
    creative: 'top_banner_2',
    name: '75% store-wide shoe sale',
    position: 'home_banner_top',
  },
};

const PromotionClicked = {
  event: 'Promotion Clicked',
  userId: '1234567890',
  properties: {
    promotion_id: 'promo_1',
    creative: 'top_banner_2',
    name: '75% store-wide shoe sale',
    position: 'home_banner_top',
  },
};

const ProductClicked = {
  event: 'Product Clicked',
  userId: '1234567890',
  properties: {
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Games',
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    position: 3,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
  },
  integrations: {
    Sailthru: {
      sendTemplate: 'send',
      reminderTemplate: 'reminder',
      reminderTime: '10m',
    },
  },
};

const ProductViewed = {
  event: 'Product Viewed',
  userId: '1234567890',
  properties: {
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    currency: 'USD',
    position: 3,
    value: 18.99,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
  },
};

const ProductAdded = {
  event: 'Product Added',
  userId: moment().format('ssDDMMYYYYssHHmm'),
  properties: {
    cart_id: 'skdjsidjsdkdj29j',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    currency: 'EUR',
    position: 3,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
    firstName: 'Lorem',
    lastName: 'Ipsum',
    gender: 'dolor',
    custom_key: 'custom_value',
  },
};

const ProductRemoved = {
  event: 'Product Removed',
  userId: '1234567890',
  email: 'ade@telepat.io',
  properties: {
    email: 'ade@telepat.io',
    cart_id: 'ksjdj92dj29dj92d2j',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Games',
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    position: 3,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
  },
};

const CartViewed = {
  event: 'Cart Viewed',
  userId: '1234567890',
  properties: {
    email: 'ade@telepat.io',
    cart_id: 'd92jd29jd92jd29j92d92jd',
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

const CheckoutStarted = {
  event: 'Checkout Started',
  userId: '1234567890',
  properties: {
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    order_id: '50314b8e9bcf000000000000',
    affiliation: 'Google Store',
    value: 30,
    revenue: 25.00,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'hasbros',
    currency: 'USD',
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
        url: 'https://www.example.com/product/path',
        image_url: 'https://www.example.com/product/path.jpg',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
      },
    ],
  },
};

const CheckoutStepViewed = {
  event: 'Checkout Step Viewed',
  userId: '1234567890',
  properties: {
    checkout_id: '50314b8e9bcf000000000000',
    step: 2,
    shipping_method: 'Fedex',
    payment_method: 'Visa',
  },
};

const CheckoutStepCompleted = {
  event: 'Checkout Step Completed',
  userId: '1234567890',
  properties: {
    checkout_id: '50314b8e9bcf000000000000',
    step: 2,
    shipping_method: 'Fedex',
    payment_method: 'Visa',
  },
};

const PaymentInfoEntered = {
  event: 'Payment Info Entered',
  userId: '1234567890',
  properties: {
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    checkout_id: '39f39fj39f3jf93fj9fj39fj3f',
    order_id: 'dkfsjidfjsdifsdfksdjfkdsfjsdfkdsf',
  },
};

const OrderCompleted = {
  event: 'Order Completed',
  userId: '1234567890',
  properties: {
    email: 'ade@telepat.io',
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    checkout_id: 'fksdjfsdjfisjf9sdfjsd9f',
    order_id: `50314b8e9bcf000000000000${moment().format('DDMMYYYYHHmmss')}`,
    affiliation: 'Google Store',
    total: 27.50,
    revenue: 25.00,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'hasbros',
    currency: 'USD',
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
        url: 'https://www.example.com/product/path',
        image_url: 'https:///www.example.com/product/path.jpg',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
      },
    ],
  },
};

const OrderUpdated = {
  event: 'Order Updated',
  userId: '1234567890',
  properties: {
    email: 'ade@telepat.io',
    order_id: '50314b8e9bcf0000000000101',
    affiliation: 'Google Store',
    total: 27.50,
    revenue: 25.00,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'hasbros',
    currency: 'USD',
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: 'Games',
        url: 'https://www.example.com/product/path',
        image_url: 'https://www.example.com/product/path.jpg',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: 'Games',
      },
      {
        product_id: 'id',
        sku: 'sku',
        name: '3rd product',
        quantity: 1,
        price: 1,
        category: 'games',
      },
    ],
  },
};

const OrderRefunded = {
  event: 'Order Refunded',
  userId: '1234567890',
  properties: {
    order_id: '50314b8e9bcf000000000000',
    total: 30,
    currency: 'USD',
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: 'Games',
        url: 'https://www.example.com/product/path',
        image_url: 'https://www.example.com/product/path.jpg',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: 'Games',
      },
    ],
  },
};

const OrderCancelled = {
  event: 'Order Cancelled',
  userId: '1234567890',
  properties: {
    order_id: '50314b8e9bcf000000000000',
    affiliation: 'Google Store',
    total: 30,
    revenue: 25.00,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'hasbros',
    currency: 'USD',
    products: [
      {
        product_id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: 'Games',
        url: 'https://www.example.com/product/path',
        image_url: 'https://www.example.com/product/path.jpg',
      },
      {
        product_id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: 'Games',
      },
    ],
  },
};

const CouponEntered = {
  event: 'Coupon Entered',
  userId: '1234567890',
  properties: {
    order_id: '50314b8e9bcf000000000000',
    cart_id: '923923929jd29jd92dj9j93fj3',
    coupon_id: 'may_deals_2016',
  },
};

const CouponApplied = {
  event: 'Coupon Applied',
  userId: '1234567890',
  properties: {
    order_id: '50314b8e9bcf000000000000',
    cart_id: '923923929jd29jd92dj9j93fj3',
    coupon_id: 'may_deals_2016',
    coupon_name: 'May Deals 2016',
    discount: 23.32,
  },
};

const CouponDenied = {
  event: 'Coupon Denied',
  userId: '1234567890',
  properties: {
    order_id: '50314b8e9bcf000000000000',
    cart_id: '923923929jd29jd92dj9j93fj3',
    coupon: 'may_deals_2016',
    reason: 'Coupon expired',
  },
};

const CouponRemoved = {
  event: 'Coupon Removed',
  userId: '1234567890',
  context: {
    page: {
      url: 'http://myurl.com',
    },
  },
  properties: {
    order_id: '50314b8e9bcf000000000000',
    cart_id: '923923929jd29jd92dj9j93fj3',
    coupon_id: 'may_deals_2016',
    coupon_name: 'May Deals 2016',
    discount: 23.32,
  },
};

const ProductAddedtoWishlist = {
  event: 'Product Added to Wishlist',
  userId: '1234567890',
  properties: {
    wishlist_id: 'skdjsidjsdkdj29j',
    wishlist_name: 'Loved Games',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: `IntegrationUnitTest - ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    position: 3,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
  },
};

const ProductRemovedfromWishlist = {
  event: 'Product Removed from Wishlist',
  userId: '1234567890',
  properties: {
    wishlist_id: 'skdjsidjsdkdj29j',
    wishlist_name: 'Loved Games',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Games',
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    position: 3,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
  },
};

const WishlistProductAddedtoCart = {
  event: 'Wishlist Product Added to Cart',
  userId: '1234567890',
  properties: {
    wishlist_id: 'skdjsidjsdkdj29j',
    wishlist_name: 'Loved Games',
    cart_id: '99j2d92j9dj29dj29d2d',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Games',
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    quantity: 1,
    coupon: 'MAYDEALS',
    position: 3,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
  },
};

const ProductShared = {
  event: 'Product Shared',
  anonymousId: '1234567890',
  properties: {
    share_via: 'email',
    share_message: 'Hey, check out this item',
    recipient: 'friend@gmail.com',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'Games',
    name: 'Monopoly: 3rd Edition',
    brand: 'Hasbro',
    variant: '200 pieces',
    price: 18.99,
    url: 'https://www.example.com/product/path',
    image_url: 'https://www.example.com/product/path.jpg',
  },
};

const CartShared = {
  event: 'Cart Shared',
  userId: '1234567890',
  properties: {
    share_via: 'email',
    share_message: 'Hey, check out this item',
    recipient: 'friend@gmail.com',
    cart_id: 'd92jd29jd92jd29j92d92jd',
    products: [
      { product_id: '507f1f77bcf86cd799439011' },
      { product_id: '505bd76785ebb509fc183733' },
    ],
  },
};

const ProductReviewed = {
  event: 'Product Reviewed',
  userId: '1234567890',
  properties: {
    product_id: '507f1f77bcf86cd799439011',
    review_id: 'kdfjrj39fj39jf3',
    review_body: 'I love this product',
    rating: '5',
  },
};

module.exports = {
  PageView,
  viewHome,
  ProductsSearched,
  ProductListViewed,
  ProductListFiltered,
  PromotionViewed,
  PromotionClicked,
  ProductClicked,
  ProductViewed,
  ProductAdded,
  ProductRemoved,
  CartViewed,
  CheckoutStarted,
  CheckoutStepViewed,
  CheckoutStepCompleted,
  PaymentInfoEntered,
  OrderCompleted,
  OrderUpdated,
  OrderRefunded,
  OrderCancelled,
  CouponEntered,
  CouponApplied,
  CouponDenied,
  CouponRemoved,
  ProductAddedtoWishlist,
  ProductRemovedfromWishlist,
  WishlistProductAddedtoCart,
  ProductShared,
  CartShared,
  ProductReviewed,
};
