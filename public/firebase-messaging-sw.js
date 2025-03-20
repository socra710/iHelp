importScripts('https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBn9fzevWDYfQYJa5RfHdNz_rxyqxh-v9U',
  authDomain: 'i-help-e0191.firebaseapp.com',
  projectId: 'i-help-e0191',
  storageBucket: 'i-help-e0191.firebasestorage.app',
  messagingSenderId: '1050659074132',
  appId: '1:1050659074132:web:d1c2fcc96687fcc7b23dc1',
  measurementId: 'G-3CHDVJH40B',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title + ' (onBackgroundMessage)';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/favicon-96x96.png',
  };

  self.registration.showNotification(title, notificationOptions);
});
