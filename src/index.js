import getCountries from './countries/api';
import './styles/main.scss';

function showError(message) {
  console.error(message);
}

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

function convert() {
  const amountField = document.querySelector('#app__amount');
  let amount = amountField.value;
  amount = parseFloat(amount);
  if (Number.isNaN(amount)) {
    showError('Enter a valid value for amount below');
  }
}

function setConvertEventHandler() {
  const convertButton = document.querySelector('button');
  convertButton.addEventListener('click', () => {
    convert();
  });
}

function start() {
  setCountries();
  setConvertEventHandler();
}

start();
