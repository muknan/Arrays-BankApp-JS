'use strict';

/*
// Challenge 1
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Invalid Coordinates. Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.city === 'Throttled! See geocode.xyz/pricing')
        throw new Error('Passed limit on API calls!');
      else console.log(data.city);

      const prov = data.prov;
      if (!prov) throw new Error('Invalid country code');
      return fetch(`https://restcountries.com/v3.1/alpha/${prov}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 😟😥`));
};

whereAmI(20.5937, 78.9629);

// Challenge 2
const wait = function (sec) {
  return new Promise(function (res) {
    setTimeout(res, sec * 1000);
  });
};

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (res, rej) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      res(img);
    });

    img.addEventListener('error', function () {
      rej(new Error('Image not found'));
    });
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    console.log('Image 1 hidden');
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    console.log('Image 2 hidden');
  })
  .catch(err => console.error(err));
  */

//
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  countriesContainer.style.opacity = 1;
  const [lang] = Object.values(data.languages);
  const [curr] = Object.values(data.currencies);

  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${lang}</p>
            <p class="country__row"><span>💰</span>${curr.name}</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (m) {
  countriesContainer.insertAdjacentText('beforeend', m);
  // countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const req = new XMLHttpRequest();
  req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  req.send();
  console.log(req.responseText);

  req.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country 2
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    const req2 = new XMLHttpRequest();
    req2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    req2.send();

    req2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      // Render country 1
      renderCountry(data2, 'neighbour');
    });
  });
};
*/

// getCountryAndNeighbour('bharat');
// getCountryAndNeighbour('usa');

// Older way
// const req = new XMLHttpRequest();
// req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// req.send();

// Newer way - fetch, promises

const getJSON = function (url, err = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${err} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // Getting neigbour
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'Gotham';
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🎆🎆🎆`);
//       renderError(`Something went wrong 😟😥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      // Getting neigbour
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 🎆🎆🎆`);
      renderError(`Something went wrong 😟😥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  countriesContainer.innerHTML = '';
  getCountryData('australia');
});

// getCountryData('Gotham');

/*
console.log('Test START');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});

console.log('Test END');


const lottery = new Promise(function (resolve, reject) {
  console.log('Lottery draw in progress...');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win! 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lottery.then(r => console.log(r)).catch(e => console.error(e));

// Promisifying setTimeout
const wait = function (sec) {
  return new Promise(function (res) {
    setTimeout(res, sec * 1000);
  });
};

// Promise chain
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

Promise.resolve('Test: resolve').then(x => console.log(x));
Promise.reject('Test: reject').catch(x => console.error(x));


const getPosition = function () {
  return new Promise(function (res, rej) {
    // navigator.geolocation.getCurrentPosition(
    //   position => res(position),
    //   error => rej(error)
    // );
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

//
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Invalid Coordinates. Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.city === 'Throttled! See geocode.xyz/pricing')
        throw new Error('Passed limit on API calls!');
      else console.log(data.city);

      const prov = data.prov;
      console.log(prov);
      if (!prov) throw new Error('Invalid country code');
      return fetch(`https://restcountries.com/v3.1/alpha/${prov}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 😟😥`));
};

btn.addEventListener('click', whereAmI);
*/

const getPosition = function () {
  return new Promise(function (res, rej) {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
//   console.log(res)
// );
//
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country data');
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 😥`);
    renderError(`💩 ${err.message}`);
  }
};

whereAmI();
console.log('FIRST');

//
// try {
//   let y = 1;
//   const x = 2;
//   y = 4;
// } catch (err) {
//   alert(err.message);
// }
