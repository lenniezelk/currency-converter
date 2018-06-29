import getCountries from './countries/api';
import './styles/main.scss';

function countriesCompareFunc(a, b) {
  if (a.currencyName < b.currencyName) return -1;
  if (a.currencyName > b.currencyName) return 1;
  return 0;
}

function setCountries() {
  getCountries().then(response => response.json()).then((data) => {
    const countries = data.results;
    const fromSelect = document.querySelector('#app__from');
    const toSelect = document.querySelector('#app__to');
    const values = Object.values(countries);
    const options = values.sort(countriesCompareFunc).map((value) => {
      const option = document.createElement('option');
      option.text = value.currencyName;
      option.value = value.currencyId;
      return option;
    });
    toSelect.append(...options);
    fromSelect.append(...options);
  });
}

function start() {
  setCountries();
}

start();
