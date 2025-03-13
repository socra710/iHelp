import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getPost(id: number) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!post) {
    return null;
  }

  return post;
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        작성자: {post.author.name} |{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
      <div className="mt-8">
        <a href="/blog" className="text-blue-600 hover:underline">
          &larr; 모든 게시물로 돌아가기
        </a>
      </div>
    </article>
  );
}
