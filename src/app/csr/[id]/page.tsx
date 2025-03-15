import { notFound } from 'next/navigation';
import { getCsr } from '@api/csr/[id]/routs';
// import Link from 'next/link'; // next/link import 추가
import Image from 'next/image';

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
    <article className="bg-white border border-gray-300 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <Image
          src={item.user.image || '/default-user.png'}
          alt="user"
          className="w-8 h-8 rounded-full cursor-pointer"
          width={32}
          height={32}
        />
        <span className="font-bold ml-1">
          {item.user.name}{' '}
          <span className="font-normal text-gray-400 ml-2">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </span>
      </div>
      <div className="mb-4" dangerouslySetInnerHTML={{ __html: item.content }} />{' '}
      {/* <Link href="/csr" className="text-blue-600 hover:underline">
        &larr; 뒤로{' '}
      </Link> */}
    </article>
  );
}
