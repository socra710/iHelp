import { getServerSession, Session } from 'next-auth';
import { GET } from '@/app/api/auth/[...nextauth]/route';
import { notFound } from 'next/navigation';
import { getCsrAll } from '@api/csr/routs';
import CsrItem from '@/components/csr/CsrItem';

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

export default async function CsrPage() {
  const session: Session | null = await getServerSession(GET);

  const response = await getCsrAll();

  if (response.status !== 200) {
    notFound();
  }

  const items: CsrItemType[] = await response.json();

  return (
    <div className="space-y-6">
      {/* <h1 className="text-3xl font-bold">CSR 현황</h1> */}

      <div className="grid grid-cols-1 gap-3">
        {items.length > 0 ? (
          items.map((csr: CsrItemType) => (
            <CsrItem
              session={session}
              key={csr.id}
              id={csr.id}
              user={csr.user}
              createdAt={csr.createdAt}
              content={csr.content}
            />
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
