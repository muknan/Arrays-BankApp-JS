// exporting module
console.log('Exporting module');

// ----- Blocking code -----
// Await outside of async function will block the entire module
// console.log('Start fetching users...');
// await fetch(`https://jsonplaceholder.typicode.com/users`);
// console.log('Finished fetching users');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product}s added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export {
  totalPrice,
  totalQuantity as qt, // Alias in export
};

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product}s added to cart`);
}
