import { notFound } from 'next/navigation';
import { getCsrAll } from '@api/csr/routs';
import Image from 'next/image';
import Link from 'next/link';

type CsrItem = {
  id: number;
  title: string;
  user: {
    name: string;
    image: string;
  };
  createdAt: string;
  content: string;
};

export default async function CsrPage() {
  const response = await getCsrAll();

  if (response.status !== 200) {
    notFound();
  }

  const items: CsrItem[] = await response.json();

  return (
    <div className="space-y-6">
      {/* <h1 className="text-3xl font-bold">CSR 현황</h1> */}

      <div className="grid grid-cols-1 gap-3">
        {items.length > 0 ? (
          items.map((csr: CsrItem) => (
            <article key={csr.id} className="bg-white border border-gray-300 p-6 rounded-lg">
              <Link href={`/csr/${csr.id}`}>
                <div className="flex items-center mb-4">
                  <Image
                    src={csr.user.image || '/default-user.png'}
                    alt="user"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    width={32}
                    height={32}
                  />
                  <span className="font-bold ml-1">
                    {csr.user.name}{' '}
                    <span className="font-normal text-gray-400 ml-2">
                      {new Date(csr.createdAt).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <div className="mb-4" dangerouslySetInnerHTML={{ __html: csr.content }} />
              </Link>
            </article>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
