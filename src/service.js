export default function registerServiceWorker() {
  if (!window.navigator.serviceWorker) return;

  window.navigator.serviceWorker.register('/sw.js').then((reg) => {
    if (!window.navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      console.log('service worker ready');
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
