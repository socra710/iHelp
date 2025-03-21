import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize the Firebase Admin SDK if not already initialized
// console.log(admin.apps.length);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { title, body, token } = data;

    const message = {
      data: {
        title,
        body,
      },
      token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return NextResponse.json(
        { message: 'Data received and processed successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      return NextResponse.json({ message: 'Error processing data' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
  }
}
