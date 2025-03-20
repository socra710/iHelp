'use client';
import { useEffect, useCallback } from 'react';
import { getMessaging, onMessage, getToken, isSupported, Unsubscribe } from 'firebase/messaging';
import { firebaseApp } from '@/lib/firebase';

export default function FireBase() {
  const getMessagingInstance = useCallback(async () => {
    try {
      const isSupportedBrowser = await isSupported();
      return isSupportedBrowser ? getMessaging(firebaseApp) : null;
    } catch (err) {
      console.error('Error getting messaging instance:', err);
      return null;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications.');
      return;
    }

    const messagingInstance = await getMessagingInstance();
    if (!messagingInstance) return;

    if (Notification.permission === 'granted') {
      try {
        const token = await getToken(messagingInstance);
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    } else {
      try {
        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    }
  }, []);

  const setupMessageListener = useCallback(async () => {
    const messagingInstance = await getMessagingInstance();
    if (!messagingInstance) return;

    return onMessage(messagingInstance, (payload) => {
      if (
        !('Notification' in window) ||
        Notification.permission !== 'granted' ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      console.log('Received message payload:', payload);

      if (payload.data && payload.notification) {
        const title = `${payload.notification.title} foreground`;
        const body = payload.notification.body;
        const redirectUrl = '/';

        const notification = new Notification(title, {
          body,
          icon: '/icons/favicon-96x96.png',
        });

        notification.onclick = () => {
          window.open(redirectUrl, '_blank')?.focus();
        };
      }
    });
  }, []);

  useEffect(() => {
    requestPermission();

    let unsubscribe: Unsubscribe | undefined;
    setupMessageListener().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [requestPermission, setupMessageListener]);

  return null;
}
