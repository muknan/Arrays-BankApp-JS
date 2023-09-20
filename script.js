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

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

const calcDisplaySummary = function (movements, interest) {
  labelSumIn.textContent = `${movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)}€`;

  labelSumOut.textContent = `${Math.abs(
    movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  )}€`;

  labelSumInterest.textContent = `${movements
    .filter(mov => mov > 0)
    .map(mov => (mov * interest) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, sum) => acc + sum, 0)}€`;
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

// Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent form from submitting (reload after button press)
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    containerApp.style.cssText = `opacity: 1`;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // Display Movements
    displayMovements(currentAccount.movements);

    // Display Balance
    calcDisplayBalance(currentAccount.movements);

    // Display Summary
    calcDisplaySummary(currentAccount.movements, currentAccount.interestRate);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

// FIND using filter method
const acc2 = accounts.filter(acc => acc.owner === 'Jessica Davis');
console.log(...acc2);


let a = [3, 7, 5, 6, 2];
let a1;
let max = [];
const un = a;
function subsetA(arr) {
  let a1 = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (a1 < arr[i]) {
      a1 = arr[i];
    }
  }
  let b = arr.filter(ar => ar == a1);
  if (b.length > 1) {
    a = arr.filter(ar => ar !== a1);
  } else {
    a = arr.filter(ar => ar !== a1);
    max.unshift(a1);
  }
}

while (max.length < 3) {
  subsetA(a);
}

function arrSum(arr) {
  return arr.reduce((acc, sum) => acc + sum, 0);
}

function otherArr(arr) {
  let s = arr;
  for (let i = 0; i < max.length; i++) {
    s = s.filter(ar => ar !== max[i]);
  }
  return s;
}

const other = otherArr(un);

console.log(arrSum(max));
console.log(arrSum(other));

// if (arrSum(max) > arrSum()) {
//   console.log('Hurray!');
// }

// const same = function (arr1, arr2) {
//   let flag = true;
//   for (const e of arr1) {
//     if (arr2.includes(e * e)) {
//       let index = arr2.indexOf(e * e);
//       arr2.splice(index, 1);
//       flag = true;
//     } else {
//       flag = false;
//       break;
//     }
//   }
//   return flag;
// };

// console.log(same([1, 1, 2], [4, 1, 1]));

// Anagram
const validAnagram = function (str, ana) {
  const lookup = {};

  if (str.length !== ana.length) return false;

  for (const s of str) {
    lookup[s] = ++lookup[s] || 1;
  }
  for (const a of ana) {
    if (!lookup[a]) {
      return false;
    } else {
      lookup[a]--;
    }
  }
  return true;
};

console.log(validAnagram('anagramb', 'ambanrga'));
*/

const sumZero = function (arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let sum = arr[start] + arr[end];
    if (sum === 0) {
      return [arr[start], arr[end]];
    } else {
      sum > 0 ? end-- : start++;
    }
  }
};

// console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 5]));

const countUniqueValues = function (arr) {
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
};

// console.log(countUniqueValues([1, 1, 2, 2, 3, 4, 4, 4, 7, 7]));

const maxSubarraySum = function (arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
};

// console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3));

const sameFrequency = function (n1, n2) {
  const lookup = {};

  if (`${n1}`.length !== `${n2}`.length) {
    return false;
  }

  for (let n of `${n1}`) {
    n = Number(n);
    lookup[n] = ++lookup[n] || 1;
  }

  for (let n of `${n2}`) {
    n = Number(n);
    if (!lookup[n]) {
      return false;
    } else {
      lookup[n]--;
    }
    return true;
  }
};

// console.log(sameFrequency(1235, 3521));

const areThereDuplicates = function () {
  let obj = {};
  for (const a of arguments) {
    obj[a] = ++obj[a] || 1;
    if (obj[a] > 1) {
      return true;
    }
  }
  return false;
};

// console.log(areThereDuplicates(12, 13, 14, 15, 16, 13));

const averagePair = function (arr, val) {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    if ((arr[i] + arr[j]) / 2 > val) {
      j--;
    } else if ((arr[i] + arr[j]) / 2 < val) {
      i++;
    } else if ((arr[i] + arr[j]) / 2 === val) {
      return [arr[i], arr[j]];
    }
  }
};

// console.log(averagePair([1, 2, 3, 4, 5, 6], 3));

const isSubsequence = function (s, t) {
  let i = 0;
  for (let j = 0; j < t.length; j++) {
    if (s[i] === t[j]) {
      i++;
      if (i > s.length - 1) {
        return true;
      }
    }
  }
  return false;
};

// console.log(isSubsequence('abc', 'azbkojnkzc'));

const minSubArrayLen = function (arr, n) {
  let l = 0;
  let r = 0;
  let res = arr.length + 1;
  let sum = 0;

  while (l < arr.length) {
    if (sum < n && r < arr.length) {
      sum += arr[r];
      r++;
    } else if (sum >= n) {
      res = Math.min(res, r - l);
      sum -= arr[l];
      l++;
    } else {
      break;
    }
  }
  return res === arr.length + 1 ? 0 : res;
};

// console.log(minSubArrayLen([1, 3, 5, 4, 3, 2, 4], 12));

const longestSubstring = function (str) {
  let longest = 0;
  const seen = {};
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }
    longest = Math.max(longest, i - start + 1);
    seen[char] = i + 1;
  }
  return longest;
};

// console.log(longestSubstring('xyxyzax'));

// Recursion

const factRec = function (num) {
  if (num <= 1) {
    return 1;
  }
  return num * factRec(num - 1);
};
// console.log(factRec(5));

// Recursion helper method

const collectOdd = function (arr) {
  let odd = [];

  function helper(help) {
    if (help.length === 0) {
      return;
    }
    if (help[0] % 2 !== 0) {
      odd.push(help[0]);
    }
    helper(help.slice(1));
  }

  helper(arr);
  return odd;
};

// Pure recursive way
const collectOddPure = function (arr) {
  let odd = [];
  if (arr.length === 0) {
    return odd;
  }
  if (arr[0] % 2 !== 0) {
    odd.push(arr[0]);
  }
  odd = odd.concat(collectOddPure(arr.slice(1)));
  return odd;
};

// console.log(collectOddPure([1, 2, 3, 4, 5, 6, 7, 8, 9]));

const power = function (num, pow) {
  if (pow === 0) {
    return 1;
  }
  return num * power(num, pow - 1);
};
// console.log(power(2, 5));

const fact = function (num) {
  if (num === 0) {
    return 1;
  }
  return num * fact(num - 1);
};

// console.log(fact(4));
