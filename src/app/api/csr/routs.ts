import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 싱글톤 인스턴스 가져오기

export async function getCsrAll() {
  // Add a 2-second delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const items = await prisma.csr.findMany({
      where: { published: true },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
