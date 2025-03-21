import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getToken({ req });

  const data = await req.json();
  const { token, deviceInfo } = data;

  const userId = session?.sub;

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }

  try {
    // Check if deviceInfo exists and has the expected format
    // Extract user agent and device info
    const userAgent = req.headers.get('user-agent') || '';
    let deviceType = deviceInfo || 'web';
    if (userAgent) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        deviceType = 'mobile';
      } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
        deviceType = 'mac';
      } else if (/Win/i.test(userAgent)) {
        deviceType = 'windows';
      } else if (/Linux/i.test(userAgent)) {
        deviceType = 'linux';
      }
    }

    await prisma.fcmToken.upsert({
      where: { token },
      update: {
        updatedAt: new Date(),
        deviceInfo: deviceType,
      },
      create: {
        token,
        userId: userId || '',
        deviceInfo: deviceType,
      },
    });
    return NextResponse.json({ message: 'Token saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving token:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
