'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; //Empty out the element before inserting the html nodes to DOM
  movements.forEach((mov, i) => {
    const type = mov < 0 ? `withdrawal` : `deposit`;

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${mov}</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

// Computing usernames
const usernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(n => n.at(0))
      .join('');
  });
};

usernames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, mov] of movements.entries()) {
  if (mov < 0)
    console.log(`Transaction (${i + 1}): You withdrew ${Math.abs(mov)}`);
  else console.log(`Transaction (${i + 1}): You deposited ${mov}`);
}

console.log('\nFOR EACH STARTS HERE\n\n');

// continue and break does not work on (foreach), it loops over entire array unlike (for of)
movements.forEach((mov, i, arr) => {
  if (mov < 0)
    console.log(`Transaction (${i + 1}): You withdrew ${Math.abs(mov)}`);
  else console.log(`Transaction (${i + 1}): You deposited ${mov}`);
});


// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log([...currenciesUnique]);
currenciesUnique.forEach((value, _, set) => {
  console.log(`${value}: ${value}`);
});
*/

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // 4-2 = 2 elements and 4th index is not included
console.log(arr.slice(-2));
console.log(arr.slice(-1)); // last element
console.log(arr.slice(1, -2)); // last element is not included returned array
console.log(arr.slice()); // Creates a shallow copy and this can be chained
console.log([...arr]); // Creates a shallow copy as well

// Splice
// console.log(arr.splice(2)); // Mutates the original array, spliced part is removed
arr.splice(-1);
arr.splice(1, 2);
console.log(arr);

// Reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f']; // Mutates the original array
console.log(arr2.reverse());

// Concat
const letters = arr.concat(arr2); // No mutation
console.log(letters);
console.log([...arr, ...arr2]); // No mutation

// Join
console.log(letters.join(' - '));
// Split
console.log(letters.join(' - ').split(' - '));


const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting the last array element
console.log(arr[arr.length - 1]);
console.log(...arr.slice(-1));
console.log(arr.at(-1)); // easier like slice but no need to spread and supports chaining

console.log('mukul'.at(-1));
*/

// MAP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

const convert = movements.map(mov => parseInt(mov * euroToUsd));

const convertFor = [];

movements.forEach(mov => {
  convertFor.push(parseInt(mov * euroToUsd));
});

const moveDescp = movements.map(
  (mov, i) =>
    `Transaction (${i + 1}): You ${
      mov < 0 ? 'withdrew' : 'deposited'
    } ${Math.abs(mov)}`
);

console.log(movements);
console.log(convert);
console.log(convertFor);
console.log(moveDescp);
