import idb from 'idb';

export function createDb() {
  idb.open('currencyConverter', 1, (upgradeDb) => {
    upgradeDb.createObjectStore('rates', { keyPath: 'currencyStr' });
  });
}

export function addRatesToDB(rate) {
  idb.open('currencyConverter').then((db) => {
    const tx = db.transaction('rates', 'readwrite');
    const store = tx.objectStore('rates');
    store.put(rate);
  });
}

export function getRateFromDB(currencyStr) {
  return idb.open('currencyConverter').then((db) => {
    const tx = db.transaction('rates', 'readwrite');
    const store = tx.objectStore('rates');
    return store.get(currencyStr);
  });
}
