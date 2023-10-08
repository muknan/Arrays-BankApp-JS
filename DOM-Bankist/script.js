'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const ops = document.querySelector('.operations');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navEl = document.querySelector('.nav');

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

// Tabbed component

ops.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== link) e.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing an "argument" into handler function using 'this'
navEl.addEventListener('mouseover', handleHover.bind(0.5));

navEl.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) navEl.classList.add('sticky');
//   else navEl.classList.remove('sticky');
// });

// Sticky navigation: Intersection observer API

// const obsCallback = function (entries, obs) {
//   entries.forEach(e => {
//     console.log(e);
//   });
// };
// const obsOptions = { root: null, threshold: [0, 0.2] };
// const obs = new IntersectionObserver(obsCallback, obsOptions);
// obs.observe(section1);

const header = document.querySelector('.header');
const navHeight = navEl.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navEl.classList.add('sticky');
  else navEl.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (ent, obs) {
  const [e] = ent;
  if (!e.isIntersecting) return;

  // Replace src with data-src (uncompressed image)
  e.target.src = e.target.dataset.src;
  e.target.addEventListener('load', function () {
    e.target.classList.remove('lazy-img');
  });
  obs.unobserve(e.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(i => imageObserver.observe(i));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  // Next slide
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const nextSlide = function () {
    if (curSlide >= maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    dotActive(curSlide);
  };

  // Prev slide
  const prevSlide = function () {
    if (curSlide <= 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    dotActive(curSlide);
  };

  // Activate dot
  const dotActive = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Initialize slider
  const initSlider = function () {
    goToSlide(0);
    createDots();
    dotActive(0);
  };
  initSlider();

  // Even handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    const { slide } = e.target.dataset;
    if (e.target.classList.contains('dots__dot')) {
      e.target.classList.add('dots__dot--active');
      goToSlide(slide);
      dotActive(slide);
      curSlide = slide;
    }
  });
};
slider();

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

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'darkgreen';

// Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (e) {
  if (e !== h1) {
    e.style.transform = 'scale(0.5)';
  }
});
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});

window.addEventListener('load', function (e) {
  console.log(e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
