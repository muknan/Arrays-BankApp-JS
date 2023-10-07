'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y):', window.scrollX, window.scrollY);
  console.log(
    'Viewport Height/Width:',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
const h1 = document.querySelector('h1');
const col = function (e) {
  h1.style.backgroundColor = 'pink';

  h1.removeEventListener('mouseenter', col);
};

h1.addEventListener('mouseenter', col);

setTimeout(() => {
  h1.style.cssText = '';
  h1.removeEventListener('mouseenter', col);
}, 1000);

// h1.onmouseenter = function (e) {
//   h1.style.backgroundColor = 'red';
// };

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.cssText = `padding: 0.5rem 1.5rem;
    border-radius: 10rem`;
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target);
});
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const headerEl = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allBtns = document.getElementsByTagName('button');
console.log(allBtns);

const cnBtn = document.getElementsByClassName('btn');
console.log(cnBtn);

// Creating and inserting elements
const msg = document.createElement('div');
msg.classList.add('cookie-message');
// msg.textContent = 'We use cookies for improved functionality and analytics.';
msg.innerHTML =
  'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie">Got it!</button>';
// A DOM element which was created is unique and can only be used one time. (append or prepend)
// headerEl.prepend(msg);
headerEl.append(msg);

// To use same DOM element multiple times, clone the node
// headerEl.append(msg.cloneNode(true));

// To add DOM element after or before header
// headerEl.before(msg);
// headerEl.after(msg);

// DELETE elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    e.preventDefault();
    // msg.remove();
    msg.parentElement.removeChild(msg);
  });

// Styles
msg.style.cssText = `background-color: #37383d;
width:120%`;
headerEl.style.cssText = `overflow: hidden;`;

msg.style.height = parseFloat(getComputedStyle(msg).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');
// document.documentElement.style.cssText = `--color-primary: pink`;

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Test Text';

// Non-standard properties
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // Absolute url
console.log(logo.getAttribute('src')); // Relative url

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use
// logo.className = 'test';
*/
