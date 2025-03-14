import { notFound } from 'next/navigation';
import { getCsr } from '@api/csr/[id]/routs';
import Link from 'next/link'; // next/link import 추가

export default async function CsrPostPage({ params }: { params: Promise<{ id: string }> }) {
  const response = await getCsr(parseInt((await params).id));

  if (response.status !== 200) {
    notFound();
  }

  const item = await response.json();

  if (!item) {
    notFound();
  }

  return (
    <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        작성자: {item.author.name} | {new Date(item.createdAt).toLocaleDateString()}
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <p>{item.content}</p>
      </div>
      <div className="mt-8">
        {/* <a> 태그 대신 <Link> 컴포넌트 사용 */}
        <Link href="/csr" className="text-blue-600 dark:text-blue-400 hover:underline">
          &larr; 모든 게시물로 돌아가기
        </Link>
      </div>
    </article>
  );
}
