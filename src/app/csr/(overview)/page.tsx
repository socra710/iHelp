import { notFound } from 'next/navigation';
import { getCsrAll } from '@api/csr/routs';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as fasHeart,
  faComment as fasComment,
  faRetweet as fasRetweet,
} from '@fortawesome/free-solid-svg-icons';

import 'froala-editor/css/froala_editor.pkgd.min.css';

type CsrItemType = {
  id: number;
  title: string;
  user: {
    id: number;
    email: string;
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
  // 테스트 코드 작성
  const session = await getServerSession();

  const items: CsrItemType[] = await fetchCsrData();
  if (items && items.length === 0) {
    return <p>데이터가 없습니다.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3">
        {items.map((csr: CsrItemType) => (
          <article className="bg-white border border-gray-300 p-6 rounded-lg" key={csr.id}>
            <div className="flex items-center mb-4">
              <Link className="inline-flex items-center" href={`/user/${csr.user.id}`}>
                <Image
                  src={csr.user.image || '/default-user.png'}
                  alt="user"
                  className="rounded-full cursor-pointer"
                  width={32}
                  height={32}
                />
                <span className="font-bold ml-1 cursor-pointer hover:underline">
                  {csr.user.name}
                </span>
              </Link>
              <span className="font-normal text-gray-400 ml-2">
                {new Date(csr.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <Link href={`/csr/${csr.id}`}>
                <div
                  className="fr-view mb-4 cursor-pointer"
                  dangerouslySetInnerHTML={{ __html: csr.content }}
                />
              </Link>
            </div>
            <div className="flex flex-col-3 mt-4">
              <button className="flex items-center text-gray-500 hover:text-black focus:outline-none mr-5 cursor-pointer">
                <FontAwesomeIcon
                  icon={session?.user?.email === csr.user.email ? fasHeart : faHeart}
                  className="mr-1 text-sm"
                  style={{ minWidth: '16px' }}
                />
                <span>3</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-black focus:outline-none mr-5 cursor-pointer">
                <FontAwesomeIcon
                  icon={session?.user?.email === csr.user.email ? fasComment : faComment}
                  className="mr-1 text-sm"
                  style={{ minWidth: '16px' }}
                />
                <span>2</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-black focus:outline-none mr-5 cursor-pointer">
                <FontAwesomeIcon
                  icon={fasRetweet}
                  className="mr-1 text-sm solid"
                  style={{ minWidth: '16px' }}
                />
                <span>1</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-black focus:outline-none mr-5 cursor-pointer">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="mr-1 text-sm solid"
                  style={{ minWidth: '16px' }}
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
