import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getCsr } from '@api/csr/[id]/routs';
import BackLink from '@components/csr/BackLink';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react'; // Suspense 불러오기
import Test from '@/app/ui/skeletons/Test'; // fallback 불러오기
import Test2 from '@/app/ui/skeletons/csr/Test2'; // fallback 불러오기

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as fasHeart,
  faComment as fasComment,
  faRetweet as fasRetweet,
} from '@fortawesome/free-solid-svg-icons';

import 'froala-editor/css/froala_editor.pkgd.min.css';

export default async function CsrPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();

  if (!session) {
    redirect(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`);
  }

  const response = await getCsr(parseInt((await params).id));

  if (response.status !== 200) {
    notFound();
  }

  const item = await response.json();

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BackLink />
      <div className="grid grid-cols-1 gap-3">
        <article className="bg-white border border-gray-300 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Link className="inline-flex items-center" href={`/user/${item.user.id}`}>
              <Image
                src={item.user.image || '/default-user.png'}
                alt="user"
                className="rounded-full cursor-pointer"
                width={32}
                height={32}
              />
              <span className="font-bold ml-1 cursor-pointer hover:underline">
                {item.user.name}
              </span>
            </Link>
            <span className="font-normal text-gray-400 ml-2">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="fr-view mb-4" dangerouslySetInnerHTML={{ __html: item.content }} />
          <div className="flex flex-col-3 mt-4">
            <button className="flex items-center text-gray-500 hover:text-black focus:outline-none mr-5 cursor-pointer">
              <FontAwesomeIcon
                icon={session?.user?.email === item.user.email ? fasHeart : faHeart}
                className="mr-1 text-sm"
                style={{ minWidth: '16px' }}
              />
              <span>3</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-black focus:outline-none mr-5 cursor-pointer">
              <FontAwesomeIcon
                icon={session?.user?.email === item.user.email ? fasComment : faComment}
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
      </div>
      <Suspense fallback={<Test />}>{<Test2 />}</Suspense>
    </div>
  );
}
