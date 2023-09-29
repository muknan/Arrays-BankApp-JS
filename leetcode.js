/*
////////////////////////////////////////////////////////
// ---------- DATA STRUCTURES & ALGORITHMS ---------- //
////////////////////////////////////////////////////////

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

// Same elements - Refactored (check if second array has power of 2 of elements in first array)
const sameRef = function (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let f1 = {};
  let f2 = {};
  for (let val of arr1) {
    f1[val] = (f1[val] || 0) + 1;
  }
  for (let val of arr2) {
    f2[val] = (f2[val] || 0) + 1;
  }
  for (let key in f1) {
    if (!(key ** 2 in f2)) return false; // check if key is present
    if (f2[key ** 2] !== f1[key]) return false; // check value/freq of key
  }
  return true;
};
console.log(sameRef([1, 2, 2, 1], [1, 1, 4, 4]));

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
  if(s.length===0){return true}
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

const productArr = function (arr) {
  let pr = 1;

  if (arr.length === 0) {
    return 1;
  } else {
    pr = arr[0];
  }
  pr = pr * productArr(arr.slice(1));
  return pr;
};

// console.log(productArr([3, 12, 5]));

const recursiveRange = function (n) {
  if (n === 1) {
    return 1;
  }
  return `${n}, ${recursiveRange(n - 1)}`;
};

// console.log(recursiveRange(5));

let f = 0;
let s = 1;
let t = 0;
const fib = function (n) {
  if (n > 0) {
    t = f;
    f = s;
    s = f + t;
    return `${t}  ${fib(n - 1)}`;
  } else {
    return '';
  }
};

// console.log(fib(10));

const reverse = function (str) {
  if (str.length === 0) {
    return 'asd';
  }
  return str[str.length - 1] + reverse(str.slice(0, str.length - 1));
};
// console.log(reverse('Hello there!'));

const isPalindrome = function (str) {
  if (str.length === 1) {
    return true;
  }
  if (str.length === 2) {
    return str[0] === str[1];
  }
  if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1));
  return false;
};

// console.log(isPalindrome('civic'));

const someRecursive = function (arr, cb) {
  if (arr.length === 0) {
    return false;
  }
  if (cb(arr[0])) {
    return true;
  }
  return someRecursive(arr.slice(1), cb);
};

// console.log(someRecursive([2, 12, 10], val => val % 2 !== 0));

const flatten = function (arr) {
  let ar = [];
  if (arr.length === 0) {
    return ar;
  } else {
    ar.push(Number([arr[0]].join()));
  }
  ar = ar.concat(flatten(arr.slice(1)));
  return ar;
};

// console.log(flatten([[[[1]]], 2, [[3]], 4]));

let a = [[[[1]]], 2, [[[[3]]]], 4];
// console.log(Number(a[2].join()));

const capitalizeFirst = function (str) {
  let temp = [];
  if (str.length === 0) {
    return temp;
  } else {
    temp.push(str[0][0].toUpperCase() + str[0].slice(1, str[0].length));
  }
  temp = temp.concat(capitalizeFirst(str.slice(1)));
  return temp;
};

// console.log(capitalizeFirst(['hello', 'there', 'mukul', 'nanda']));

const nestedEvenSum = function (obj, sum = 0) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      sum += nestedEvenSum(obj[key]);
    } else if (typeof obj[key] === 'number' && obj[key] % 2 === 0) {
      sum += obj[key];
    }
  }
  return sum;
};

const obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: 'car' },
};

// console.log(nestedEvenSum(obj2));

const capitalizeWords = function (arr) {
  let words = [];
  if (arr.length === 1) {
    return arr[0].toUpperCase();
  } else {
    words.push(arr[0].toUpperCase());
  }
  words = words.concat(capitalizeWords(arr.slice(1)));
  return words;
};

// console.log(capitalizeWords(['mukul', 'nanda']));

const stringify = function (obj, res = '') {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      res += stringify(obj[key]);
    } else if (typeof obj[key] === 'number') {
      res += obj[key] + ' ';
    }
  }
  return res;
};

// console.log(stringify(obj2));

const collectStrings = function (obj, res = []) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      res += collectStrings(obj[key]);
    } else if (typeof obj[key] === 'string' && obj[key].length > 1) {
      res += obj[key] + ' ';
    }
  }
  return res;
};

const obj1 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: 'car' },
};
console.log(collectStrings(obj1));


const linearSearch = function (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
};

// console.log(linearSearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 9));

// Binary Search
const binarySearch = function (arr, val) {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (arr[mid] !== val && left <= right) {
    if (val > arr[mid]) left = mid + 1;
    else right = mid - 1;
    mid = Math.floor((left + right) / 2);
  }
  if (arr[mid] === val) {
    return mid;
  }
  return -1;
};

// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 9));

const naiveStr = function (str, s) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < s.length; j++) {
      if (str[i + j] !== s[j]) {
        break;
      }
      if (j === s.length - 1) {
        count++;
      }
    }
  }
  return count;
};

// console.log(naiveStr('zwomgomwomgomg', 'omg'));

const swap = (arr, i1, i2) => ([arr[i1], arr[i2]] = [arr[i2], arr[i1]]);

const bubbleSort = function (arr) {
  let noSwaps = true;
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
};

// console.log(bubbleSort([10, 5, 12, 7, 2, 8, 19]));

const selectionSort = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i !== min) swap(arr, i, min);
  }
  return arr;
};

// console.log(selectionSort([10, 5, 12, 7, 2, 8, 19]));

const insertionSort = function (arr) {
  let j;
  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i];
    for (j = i - 1; j >= 0 && arr[j] > curr; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = curr;
  }
  return arr;
};

// console.log(insertionSort([2, 1, 9, 76, 4]));

const mergeArrays = function (arr1, arr2) {
  let i = 0;
  let j = 0;
  let temp = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      temp.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j]) {
      temp.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    temp.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    temp.push(arr2[j]);
    j++;
  }
  return temp;
};

// console.log(mergeArrays([1, 10, 50], [2, 5, 20, 45]));

const mergeSort = function (arr) {
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  if (arr.length <= 1) return arr;

  left = mergeSort(left);
  right = mergeSort(right);

  return mergeArrays(left, right);
};

// console.log(mergeSort([5, 2, 1, 6, 45, 12, 3]));

const swap = (arr, i1, i2) => ([arr[i1], arr[i2]] = [arr[i2], arr[i1]]);

const pivot = function (arr, start = 0, end = arr.length + 1) {
  let swapIdx = start;
  let pivot = arr[start];
  for (let i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, start, swapIdx);
  return swapIdx;
};

// console.log(pivot([4, 8, 2, 1, 5, 7, 6, 3]));

const quickSort = function (arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIdx = pivot(arr, left, right);
    // left
    quickSort(arr, left, pivotIdx - 1);
    // right
    quickSort(arr, pivotIdx + 1, right);
  }
  return arr;
};

// console.log(quickSort([4, 8, 2, 1, 5, 9, 7, 6, 3]));

const getDigit = function (num, n) {
  return Math.floor(Math.abs(num) / Math.pow(10, n)) % 10;
};

const digitCount = function (num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

const mostDigits = function (arr) {
  let max = 0;
  let s = digitCount(arr[0]);
  if (arr.length === 1) {
    return s;
  }
  max = Math.max(max, mostDigits(arr.splice(1)));
  return max;
};

// console.log(mostDigits([123, 12312, 12, 2222222]));

const intersect = function (arr1, arr2) {
  const a = new Set(arr1);
  return [...new Set(arr2)].filter(val => a.has(val));
};
console.log(intersect([1, 2, 3, 5], [3, 4, 5]));

// Linked List Cycle
const detectCycle = function (head) {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    slow += slow.next;
    fast += fast.next.next;

    if (slow === fast) {
      return true;
    }
  }
  return false;
};

// Linked List Cycle II
var detectCycle2 = function (head) {
  if (!head.next) return null;
  let fast = head;
  let slow = head;
  let p = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) break;
  }
  if (slow !== fast) return null;
  while (p !== slow) {
    p = p.next;
    slow = slow.next;
  }
  return slow;
};

// Remove Duplicates from Sorted List
var deleteDuplicates = function (head) {
  let dummy = new ListNode(-Infinity, head);
  let curr = head;
  let prev = dummy;

  while (curr) {
    if (curr.val === prev.val) {
      while (curr && curr.val === prev.val) {
        curr = curr.next;
      }
      prev.next = curr;
    } else {
      prev = curr;
      curr = curr.next;
    }
  }
  return dummy.next;
};

// Remove Duplicates from Sorted List II
var deleteDuplicates = function (head) {
  if (!head) return null;
  let dummy = new ListNode(-Infinity, head);
  let curr = head;
  let prev = dummy;
  let n = curr.next;

  while (curr) {
    if (curr && n && curr.val === n.val) {
      while (n && n.val === curr.val) {
        n = n.next;
      }
      prev.next = n;
      curr = n;
      n = n ? n.next : null;
    } else {
      prev = curr;
      curr = n;
      n = n ? n.next : null;
    }
  }
  return dummy.next;
};

// Add Two Numbers in Linked List
var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  let dummy = new ListNode(-1);
  let result = dummy;

  while (l1 || l2 || carry) {
    let l1Val = l1 ? l1.val : 0;
    let l2Val = l2 ? l2.val : 0;
    let nextDigit = (l1Val + l2Val + carry) % 10;
    dummy.next = new ListNode(nextDigit);
    dummy = dummy.next;
    carry = Math.floor((l1Val + l2Val + carry) / 10);
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  return result.next;
};

// Valid Parentheses - Stack
var isValid = function (s) {
  let stack = [];
  let i = 0;
  let check = '() {} []';

  while (i < s.length) {
    stack.push(s[i]);
    i++;
    let open = stack[stack.length - 2];
    let close = stack[stack.length - 1];
    let paren = open + close;
    if (check.includes(paren)) {
      stack.pop();
      stack.pop();
    }
  }
  return stack.length === 0;
};

// Reverse Linked List
var reverseList = function (head) {
  let curr = head;
  let prev = null;
  let next;

  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

// Group Anagrams
const groupAna = function (strs) {
  const sortedArrs = strs.map(word => word.split('').sort().join(''));
  const res = {};
  let i = 0;
  for (let i = 0; i < strs.length; i++) {
    if (!res[sortedArrs[i]]) {
      res[sortedArrs[i]] = strs[i];
    } else {
      res[sortedArrs[i]].push(strs[i]);
    }
  }
  return res.values;
};

// Intersection of arrays
const intersectArr = function (arr1, arr2) {
  let res = new Map();
  for (const a of arr1) {
    if (!res.has(a)) {
      res.set(a, 1);
    }
  }
  return arr2.filter(n => {
    if (res.has(n)) {
      res.delete(n);
      return true;
    } else {
      return false;
    }
  });
};
let nums1 = [4, 9, 5];
let nums2 = [9, 4, 9, 8, 4];
// console.log(intersectArr(nums1, nums2));

// First unique char in a string
const firstUni = function (str) {
  let res = {};
  let k;
  for (const key of str) {
    res[key] = ++res[key] || 1;
  }
  for (key in res) {
    if (res[key] === 1) {
      k = key;
      break;
    }
  }
  return k ? str.indexOf(k) : -1;
};

// console.log(firstUni('leetcode'));

const searchInsert = function (arr, t) {
  if (arr.length === 0) {
    return 0;
  }
  for (let i = 0; i < arr.length; i++) {}
};

console.log(searchInsert([1, 3, 5, 6], 2));
*/
