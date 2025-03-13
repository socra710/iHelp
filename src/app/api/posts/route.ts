import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 싱글톤 인스턴스 가져오기

// 브런치 테스트
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, authorId } = body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
