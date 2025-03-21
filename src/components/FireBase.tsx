'use client';
import { useEffect } from 'react';
import { getMessaging, onMessage, getToken, isSupported, Unsubscribe } from 'firebase/messaging';
import { firebaseApp } from '@/lib/firebase';

export default function FireBase() {
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    const saveToken = async (token: string) => {
      try {
        const response = await fetch('/api/fcm/token/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, userId: 'currentUserId', deviceInfo: 'deviceInfo' }), // Replace 'currentUserId' and 'deviceInfo' with actual values
        });

        if (!response.ok) {
          console.error('Failed to save token:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving token:', error);
      }
    };

    const setup = async () => {
      try {
        // Check if browser supports Firebase messaging
        const isSupportedBrowser = await isSupported();
        if (!isSupportedBrowser) {
          console.warn('Browser does not support Firebase messaging');
          return;
        }

        // Get messaging instance
        const messagingInstance = getMessaging(firebaseApp);

        // Request permission and get token
        if (!('Notification' in window)) {
          console.warn('This browser does not support notifications.');
          return;
        }

        if (Notification.permission === 'granted') {
          try {
            const token = await getToken(messagingInstance);
            console.log('FCM Token:', token);
            await saveToken(token);
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

        // Set up message listener
        unsubscribe = onMessage(messagingInstance, (payload) => {
          if (
            !('Notification' in window) ||
            Notification.permission !== 'granted' ||
            document.visibilityState !== 'visible'
          ) {
            return;
          }

          console.log('Received message payload:', payload);

          if (payload.data) {
            const title = `${payload.data.title} foreground`;
            const body = payload.data.body;
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
      } catch (err) {
        console.error('Error setting up Firebase messaging:', err);
      }
    };

    setup();

    // Cleanup function
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return null;
}
