// importing module
import {
  addToCart,
  totalPrice as price, // Alias in import
  tq,
  shippingCost as sc,
} from './shoppingCart.js'; // imports are always hoisted to the top
addToCart('Bread', 5);
console.log(price, tq); // Imported from shoppingCart.js

console.log('Importing module');
console.log(sc);

import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('Bread', 5);
console.log(ShoppingCart.totalPrice);

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

// const getLastPost = async function () {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// - Not very clean
// const last = getLastPost();
// last.then(last => console.log(last));

// const lastPost = await getLastPost(); // Top level await
// console.log(lastPost);

const cartF = (function () {
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

cartF.addToCart('Chip', '4');
cartF.addToCart('Milk', '1');
cartF.orderStock('Pita', '10');
console.log(cartF);
console.log(cartF.shippingCost); // since its not returned in IIFE

// Export
// Won't work on a browser, but would work on node.js
// export.addToCart= function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// Import
const { addToCart } = require('./shoppingCart.js');

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept(); // Injects only the changes without reloading the entire page
}

class Person {
  #greeting = 'Hello';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const mukul = new Person('Mukul');

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('Test').then(x => console.log(x));

// Polyfilling ES6 or newer methods
import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polyfilling async function
import 'regenerator-runtime/runtime';
