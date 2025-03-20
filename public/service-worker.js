function registerServiceWorker() {
  if (typeof window !== 'undefined') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('firebase-messaging-sw.js', { scope: '/firebase-cloud-messaging-push-scope' })
        .then((registration) => {
          console.log('Service Worker Registered');
          console.dir(registration);
        });
    }
  }
}
registerServiceWorker();
