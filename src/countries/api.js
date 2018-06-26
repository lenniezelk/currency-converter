import settings from '../config/settings';

export function getCountries() {
  return fetch(`${settings.API_BASE_URL}/countries`);
}
