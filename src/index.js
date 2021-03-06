import convertCurrency from './conversion/api';
import getCountries from './countries/api';
import { createDb, addRatesToDB, getRateFromDB } from './db';
import registerServiceWorker from './service';
import './styles/main.scss';


function clearResult() {
  const resultField = document.querySelector('#result');
  resultField.textContent = '';
}

function clearErrors() {
  const errorContainer = document.querySelector('#error');
  while (errorContainer.firstChild) {
    errorContainer.removeChild(errorContainer.firstChild);
  }
}

function showError(message) {
  const errorContainer = document.querySelector('#error');
  const errorDiv = document.createElement('div');
  errorDiv.textContent = message;
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

function calculateResult(amount, rate) {
  const resultField = document.querySelector('#result');
  const result = (rate * amount).toFixed(2);
  resultField.textContent = result;
}

function handleConvertFailure(currencyStr, amount) {
  getRateFromDB(currencyStr).then((res) => {
    if (typeof res !== 'undefined') {
      calculateResult(amount, res.rate);
    } else {
      showError('Failed to fetch exchange rates.');
    }
  });
}

function convert() {
  clearErrors();
  clearResult();
  const amountField = document.querySelector('#app__amount');
  const fromSelect = document.querySelector('#app__from');
  const toSelect = document.querySelector('#app__to');
  let amount = amountField.value;
  amount = parseFloat(amount);
  if (Number.isNaN(amount) || amount < 0) {
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
  convertCurrency(currencyStr).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return handleConvertFailure(currencyStr, amount);
  }).then((rates) => {
    const rate = rates[currencyStr].val;
    calculateResult(amount, rate);
    addRatesToDB({ currencyStr, rate });
  }).catch(() => {
    showError('Kindly check your network connection.');
    handleConvertFailure(currencyStr, amount);
  });
}

function setConvertEventHandler() {
  const convertButton = document.querySelector('#convert');
  convertButton.addEventListener('click', () => {
    convert();
  });
}

function start() {
  registerServiceWorker();
  createDb();
  setConvertEventHandler();
  setCountries();
}

start();
