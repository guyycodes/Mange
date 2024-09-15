if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/mange-client/sw.js', { scope: '/mange-client/' })
        .then((registration) => {
          console.log('PWA service worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('PWA service worker registration failed:', error);
        });
    });
  }