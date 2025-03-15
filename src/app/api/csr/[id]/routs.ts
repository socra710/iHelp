import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 싱글톤 인스턴스 가져오기

export async function getCsr(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const items = await prisma.csr.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
