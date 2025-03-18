import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getCsr } from '@api/csr/[id]/routs';
import BackLink from '@components/csr/BackLink';
import Image from 'next/image';
import Link from 'next/link';

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
              <span className="font-normal text-gray-400 ml-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </Link>
          </div>
          <div className="fr-view mb-4" dangerouslySetInnerHTML={{ __html: item.content }} />
        </article>
      </div>
    </div>
  );
}
