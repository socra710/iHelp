import { prisma } from '@/lib/prisma'; // 싱글톤 인스턴스 가져오기

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">블로그 게시물</h1>

      <div className="grid grid-cols-1 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">
                작성자: {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-4">{post.content}</p>
              <a href={`/blog/${post.id}`} className="text-blue-600 hover:underline font-medium">
                더 읽기 &rarr;
              </a>
            </article>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
