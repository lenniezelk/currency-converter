import settings from '../config/settings';
import URLSearchParams from 'url-search-params';

export default function convertCurrency(fromCurrency, toCurrency) {
  const params = URLSearchParams();
  params.append('q', `${fromCurrency}_${toCurrency}`);
  params.append('compact', 'y');
  const query = `${/convert}?${params.toString()}`;
  return fetch(query);
}
