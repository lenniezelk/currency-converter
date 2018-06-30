import URLSearchParams from 'url-search-params';
import settings from '../config/settings';

export default function convertCurrency(currencyStr) {
  const params = new URLSearchParams();
  params.append('q', currencyStr);
  params.append('compact', 'y');
  const query = `${settings.API_BASE_URL}/convert?${params.toString()}`;
  return fetch(query);
}
