'use client';
import React from 'react';

export default function SomeComponent() {
  const handleSendData = async () => {
    const data = {
      title: '테스트 제목',
      body: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ되는가?',
      token:
        'cGPAvx92BOTAETv1DOlLON:APA91bE9AOfIp1RW9R3EXvPOtd-hq4XhgUc1EqYKbfEj6Uh5EC5i0EyYUvdKC0bBVAZ7Xl_ID-4ijwrnRKNffHgpF10NB3YvHHY1G68k4r4e_G70cf46pYE',
    };

    try {
      const response = await fetch('/api/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Response from server:', result.message);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="inline-flex flex-col items-center justify-center w-full h-full">
      <button onClick={handleSendData}>Send FCM Message</button>
    </div>
  );
}
