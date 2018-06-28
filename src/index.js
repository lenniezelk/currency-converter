import getCountries from './countries/api';
import './styles/main.scss';


function setCountries() {
  getCountries().then((response) => {
    console.log('response: ', response);
  });
}

function start() {
  setCountries();
}

start();
