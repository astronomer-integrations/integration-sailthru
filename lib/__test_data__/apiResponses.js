const oneItemChart = {
  chnl: 'online',
  unique_id: '5c6ea8bacdb7ec46167e3e78',
  time: 'Thu, 21 Feb 2019 08:33:46 -0500',
  qty: 1,
  price: 1899,
  items: [
    {
      id: '507f1f77bcf86cd799439011',
      qty: 1,
      title: 'Monopoly: 3rd Edition',
      price: 1899,
      url: 'https://www.example.com/product/path',
      images: {
        full: 'https://www.example.com/product/path.jpg',
      },
      vars: {
        cart_id: 'skdjsidjsdkdj29j',
        sku: 'G-32',
        category: 'IntegrationUnitTest - 21-02-2019 15:33:42',
        brand: 'Hasbro',
        variant: '200 pieces',
        coupon: 'MAYDEALS',
        currency: 'EUR',
        position: 3,
        custom_key: 'custom_value',
      },
    },
  ],
  _id: '5c6ea8bacdb7ec46167e3e78',
};

const multipleItemsChart = {
  chnl: 'online',
  unique_id: '5c6ea8bacdb7ec46167e3e78',
  time: 'Thu, 21 Feb 2019 08:33:46 -0500',
  qty: 1,
  price: 1899,
  items: [
    {
      id: '507f1f77bcf86cd799439011',
      qty: 2,
      title: 'Monopoly: 3rd Edition',
      price: 1899,
      url: 'https://www.example.com/product/path',
      images: {
        full: 'https://www.example.com/product/path.jpg',
      },
      vars: {
        cart_id: 'skdjsidjsdkdj29j',
        sku: 'G-32',
        category: 'IntegrationUnitTest - 21-02-2019 15:33:42',
        brand: 'Hasbro',
        variant: '200 pieces',
        coupon: 'MAYDEALS',
        currency: 'EUR',
        position: 3,
        custom_key: 'custom_value',
      },
    },
  ],
  _id: '5c6ea8bacdb7ec46167e3e78',
};

const existingProduct = {
  event: 'Product Added',
  userId: '123',
  properties: {
    cart_id: 'skdjsidjsdkdj29j',
    product_id: '507f1f77bcf86cd799439011',
    sku: 'G-32',
    category: 'IntegrationUnitTest',
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

const newProduct = {
  event: 'Product Added',
  userId: '123',
  properties: {
    cart_id: 'skdjsidjsdkdj29j',
    product_id: '507439011',
    sku: 'G-32',
    category: 'IntegrationUnitTest',
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

module.exports = {
  oneItemChart,
  multipleItemsChart,
  newProduct,
  existingProduct,
};
