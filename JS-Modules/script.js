/*
// importing module
// import {
//   addToCart,
//   totalPrice as price, // Alias in import
//   tq,
// } from './shoppingCart.js'; // imports are always hoisted to the top
// addToCart('Bread', 5);
// console.log(price, tq); // Imported from shoppingCart.js

console.log('Importing module');
// console.log(shippingCost);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('Bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, {
//   addToCart,
//   totalPrice as price, // Alias in import
//   tq,
// } from './shoppingCart.js'; // imports default export
// console.log(price, tq);

import add, { cart } from './shoppingCart.js'; // imports default export // !! NOT A GOOD PRACTICE TO MIX DEFAULT AND NAMED EXPORTS !!
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


const ShoppingCart = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return { addToCart, orderStock, cart, totalPrice, totalQuantity };
})();

ShoppingCart.addToCart('Chips', '4');
ShoppingCart.addToCart('Milk', '1');
ShoppingCart.orderStock('Pitas', '10');
console.log(ShoppingCart);
console.log(ShoppingCart.shippingCost); // since its not returned in IIFE

// Export
// Won't work on a browser, but would work on node.js
export.addToCart= function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

// Import
const { addToCart } = require('./shoppingCart.js');
*/

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

state.user.loggedIn = false;
