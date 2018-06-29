import getCountries from './countries/api';
import './styles/main.scss';

function countriesCompareFunc(a, b) {
  if (a.currencyName < b.currencyName) return -1;
  if (a.currencyName > b.currencyName) return 1;
  return 0;
}

function createOptionFromCountry(country) {
  const option = document.createElement('option');
  option.text = country.currencyName;
  option.value = country.currencyId;
  return option;
}

function setCountries() {
  getCountries().then(response => response.json()).then((data) => {
    const countries = data.results;
    const fromSelect = document.querySelector('#app__from');
    const toSelect = document.querySelector('#app__to');
    const values = Object.values(countries);
    values.sort(countriesCompareFunc).forEach((value) => {
      toSelect.appendChild(createOptionFromCountry(value));
      fromSelect.appendChild(createOptionFromCountry(value));
    });
  });
}

function start() {
  setCountries();
}

start();
