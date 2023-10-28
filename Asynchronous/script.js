'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
  const req = new XMLHttpRequest();
  req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  req.send();
  console.log(req.responseText);

  req.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data.currencies);

    const [lang] = Object.values(data.languages);
    const [curr] = Object.values(data.currencies);
    const html = `
        <article class="country">
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

    countriesContainer.style.opacity = 1;
  });
};

getCountryData('bharat');
getCountryData('usa');
getCountryData('germany');
getCountryData('portugal');
