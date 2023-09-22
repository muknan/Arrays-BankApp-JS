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
