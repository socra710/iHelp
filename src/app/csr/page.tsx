import { notFound } from 'next/navigation';
import { getCsrAll } from '@api/csr/routs';

type CsrItem = {
  id: number;
  title: string;
  author: {
    name: string;
  };
  createdAt: string;
  content: string;
};

export default async function BlogPage() {
  const response = await getCsrAll();

  if (response.status !== 200) {
    notFound();
  }

  const items: CsrItem[] = await response.json();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">CSR 현황</h1>

      <div className="grid grid-cols-1 gap-6">
        {items.length > 0 ? (
          items.map((csr: CsrItem) => (
            <article key={csr.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{csr.title}</h2>
              <p className="text-gray-600 mb-4">
                작성자: {csr.author.name} | {new Date(csr.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-4">{csr.content}</p>
              <a href={`/csr/${csr.id}`} className="text-blue-600 hover:underline font-medium">
                더 읽기 &rarr;
              </a>
            </article>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
