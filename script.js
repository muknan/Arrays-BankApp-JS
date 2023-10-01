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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //Empty out the element before inserting the html nodes to DOM

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov < 0 ? `withdrawal` : `deposit`;

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${mov}€</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, sum) => acc + sum, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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
// console.log(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event handlers
// Making login work
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent form from submitting (reload after button press)
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and a welcome message
    containerApp.style.cssText = `opacity: 1`;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    updateUI(currentAccount);
  }
});

// Transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing transfers
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// Loan request
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && currentAccount.movements.some(mov => mov >= loan * 0.1)) {
    // Add movement
    currentAccount.movements.push(loan);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const clAccIdx = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(clAccIdx, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// Fill arrays
console.log(new Array(10).fill(0, 1, -1));
// from
const y = Array.from({ length: 10 }, () => 1);
console.log(y);

const z = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(z);

const diceRolls = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 100) + 1
);
// console.log(diceRolls);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(
    movementsUI
      .map(el => Number(el.textContent.replace('€', '')))
      .reduce((acc, s) => acc + s, 0)
  );
});

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const owners = ['Mukul', 'Gaurav', 'Meena', 'Parveen', 'Arya']; // Mutates the original array
console.log(owners.sort());

// return < 0, A, B (keep order)
// return >0, A, B (switch order)

// Ascending
// console.log(movements.sort((a, b) => (a > b ? 1 : -1)));
console.log(movements.sort((a, b) => a - b));
// Descending
console.log(movements.sort((a, b) => b - a));

// FLAT
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// FLAT MAP
const overallBal = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0); // Combines map and flat operation but only supports array depth of 1
console.log(overallBal);

// SOME

console.log(movements.includes(-130));
console.log(movements.some(mov => mov === -130));

const dep = movements.some(mov => mov > 1000);
console.log(dep);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

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

// FILTER
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(deposits);
console.log(withdrawals);

// REDUCE
// sum is an accumalator(snowball) that collects the value from each loop for next iteration
const balance = movements.reduce((sum, curr) => sum + curr, 0); // 0 (second argument is initial value of sum)
console.log(balance);


// Maximum value
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const max = movements.reduce(
  (acc, mov) => (mov > acc ? mov : acc),
  movements[0]
);
console.log(max);

///////////////////////////////////////////
// ---------- CHALLENGE 2 & 3 ---------- //
///////////////////////////////////////////

const calcAverageHumanAge = function (ages) {
  const dogToHumanAge = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, key, arr) => acc + age / arr.length, 0);
  return dogToHumanAge;
};

console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// FIND
// Unlike filter, find method only returns the first element that satisfies the condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(find);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// FIND using (for of)
let acc1;
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    acc1 = acc;
  }
}
console.log(acc1);

// Array methods practice
const bankDepSum = accounts
  .flatMap(acc => acc.movements)
  .filter(amt => amt > 0)
  .reduce((acc, s) => acc + s, 0);
console.log(bankDepSum);

const numDep = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDep);

// return sum of deposits and withdrawals in an object
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

const convertToTitleCase = function (title) {
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleLower = title
    .toLowerCase()
    .split(' ')
    .map(a =>
      !exceptions.includes(a) ? a.replace(a[0], a[0].toUpperCase()) : a
    )
    .join(' ');
  return cap(titleLower);
};

console.log(convertToTitleCase('This is a title'));
console.log(convertToTitleCase('this is a LONG title but not too long'));
console.log(convertToTitleCase('and here is another title with an EXAMPLE'));
*/

///////////////////////////////////////////
// ---------- CHALLENGE 4 ---------- //
///////////////////////////////////////////
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
const calcRecFood = function () {
  dogs.map(
    dog => (dog.recommendedFood = Math.ceil(dog.weight ** 0.75 * 0.28 * 100))
  );
};
calcRecFood();
console.log(dogs);

// 2
const tooMuch = [];
const tooLittle = [];
const okayAmt = [];
const findDog = function () {
  // const dog = dogs.find(dog => dog.owners.includes(owner));
  // const { curFood, recommendedFood } = dog[0];

  dogs.forEach(d => {
    const { curFood, recommendedFood, owners } = d;
    if (curFood > recommendedFood * 0.9 && curFood < recommendedFood * 1.1) {
      // console.log('Eating correct amount');
    } else if (curFood > recommendedFood) {
      // console.log('Eating too much');
      tooMuch.push(owners);
    } else {
      // console.log('Eating too little');
      tooLittle.push(owners);
    }
  });
};

findDog();
// console.log(`${tooMuch.flat().join(' and ')} dogs eat too much!`);
// console.log(`${tooLittle.flat().join(' and ')} dogs eat too little!`);

// console.log(dogs.some(d => d.curFood === d.recommendedFood));
// console.log(
//   dogs.some(d => {
//     const { curFood, recommendedFood, owners } = d;
//     if (curFood > recommendedFood * 0.9 && curFood < recommendedFood * 1.1) {
//       okayAmt.push(d);
//       return true;
//     }
//   })
// );
// console.log(okayAmt);

// 8
const dogsCpy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCpy);
