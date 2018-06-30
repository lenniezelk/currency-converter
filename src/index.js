import convertCurrency from './conversion/api';
import getCountries from './countries/api';
import './styles/main.scss';

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.textContent = message;
  const errorContainer = document.querySelector('#error');
  errorContainer.appendChild(errorDiv);
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
  const fromSelect = document.querySelector('#app__from');
  const toSelect = document.querySelector('#app__to');
  let amount = amountField.value;
  amount = parseFloat(amount);
  if (Number.isNaN(amount)) {
    showError('Enter a valid value for amount below');
    return;
  }
  const from = fromSelect.value;
  const to = toSelect.value;
  if (from === '' || to === '') {
    showError('Select a valid value for from currency and to currency');
    return;
  }
  const currencyStr = `${from}_${to}`;
  convertCurrency(currencyStr).then(response => response.json()).then((rates) => {
    const rate = rates[currencyStr].val;
    const resultField = document.querySelector('#result');
    const result = (rate * amount).toFixed(2);
    resultField.textContent = result;
  });
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
