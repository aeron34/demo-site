import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'demo-store-aeron.myshopify.com',
  storefrontAccessToken: '1ffa9a97e26010e629d8410890f605cd'
});

client.product.fetchAll().then((products) => {
  // Do something with the products
  console.log(products);
});
 
