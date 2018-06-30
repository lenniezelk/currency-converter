function hideActionBox() {
  const action = document.querySelector('#action');
  action.style.display = 'none';
}

function setActionButtonEvents(worker) {
  function handleWorkerReload() {
    hideActionBox();
    worker.postMessage({ action: 'skipWaiting' });
  }
  const dismiss = document.querySelector('#action__dismiss');
  const reload = document.querySelector('#action__reload');
  dismiss.removeEventListener('click', hideActionBox);
  reload.removeEventListener('click', handleWorkerReload);
  dismiss.addEventListener('click', hideActionBox);
  reload.addEventListener('click', handleWorkerReload);
}

function handleUpdateAvailable(worker) {
  const action = document.querySelector('#action');
  action.style.display = 'inline-block';
  setActionButtonEvents(worker);
}

export default function registerServiceWorker() {
  if (!window.navigator.serviceWorker) return;

  window.navigator.serviceWorker.register('/sw.js').then((reg) => {
    if (!window.navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      console.log('service worker ready');
      handleUpdateAvailable(reg.waiting);
      return;
    }

    if (reg.installing) {
      console.log('installing');
      return;
    }

    reg.addEventListener('updatefound', () => console.log('installing'));
  });

  window.navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload());
}
