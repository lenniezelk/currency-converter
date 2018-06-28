import settings from '../config/settings';

export default function getCountries() {
  return fetch(`${settings.API_BASE_URL}/countries`);
}
