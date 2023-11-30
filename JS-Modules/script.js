// importing module
// import {
//   addToCart,
//   totalPrice as price, // Alias in import
//   qt,
// } from './shoppingCart.js'; // imports are always hoisted to the top
// addToCart('Bread', 5);
// console.log(price, qt); // Imported from shoppingCart.js

console.log('Importing module');
// console.log(shippingCost);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('Bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, {
//   addToCart,
//   totalPrice as price, // Alias in import
//   qt,
// } from './shoppingCart.js'; // imports default export
// console.log(price, qt);

import add, { cart } from './shoppingCart.js'; // imports default export
add('Pizza', 2);
add('Bread', 5);
add('Apple', 4);

console.log(cart);

// ----- Top-Level await - html script need to have 'type' set as 'module' -----
// ----- No need to create a new async function -----
// ----- But this await blocks the execution of entire module -----
// console.log('Start fetching...');
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);
// console.log('Done fetching');

const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// - Not very clean
// const last = getLastPost();
// last.then(last => console.log(last));

const lastPost = await getLastPost(); // Top level await
console.log(lastPost);
