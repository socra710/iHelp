'use client';
import { useEffect } from 'react';
import { getMessaging, onMessage, getToken, isSupported } from 'firebase/messaging';
import { firebaseApp } from '@/lib/firebase';

const messaging = async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const requestPermission = async () => {
  const messagingResolve = await messaging();
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications.');
    return;
  }
  if (messagingResolve) {
    const token = await getToken(messagingResolve);
    console.log(token);
  }

  const permission = Notification.permission;
  if (permission === 'granted') {
    return;
  } else {
    Notification.requestPermission().then((permission) => {
      console.log('permission', permission);
    });
    return;
  }
};

export default function FireBase() {
  useEffect(() => {
    requestPermission();

    const onMessageListener = async () => {
      const messagingResolve = await messaging();
      if (messagingResolve) {
        onMessage(messagingResolve, (payload) => {
          if (!('Notification' in window)) {
            return;
          }
          const permission = Notification.permission;
          const title = payload.notification?.title + ' foreground';
          const redirectUrl = '/';
          const body = payload.notification?.body;
          if (permission === 'granted' && document.visibilityState === 'visible') {
            console.log('payload', payload);
            if (payload.data) {
              const notification = new Notification(title, {
                body,
                icon: '/icons/favicon-96x96.png',
              });
              notification.onclick = () => {
                window.open(redirectUrl, '_blank')?.focus();
              };
            }
          }
        });
      }
    };

    onMessageListener();
  }, []);

  return null;
}
