import { notFound } from 'next/navigation';
import { getCsrAll } from '@api/csr/routs';
import Image from 'next/image';
import Link from 'next/link';

import 'froala-editor/css/froala_editor.pkgd.min.css';

type CsrItemType = {
  id: number;
  title: string;
  user: {
    name: string;
    image: string;
  };
  createdAt: string;
  content: string;
};

async function fetchCsrData(): Promise<CsrItemType[]> {
  const response = await getCsrAll();

  if (response.status !== 200) {
    notFound();
  }

  return response.json();
}

export default async function CsrPage() {
  const items: CsrItemType[] = await fetchCsrData();
  if (items && items.length === 0) {
    return <p>데이터가 없습니다.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3">
        {items.map((csr: CsrItemType) => (
          <Link href={`/csr/${csr.id}`} key={csr.id}>
            <article className="bg-white border border-gray-300 p-6 rounded-lg cursor-pointer">
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
              <div className="fr-view mb-4" dangerouslySetInnerHTML={{ __html: csr.content }} />
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
