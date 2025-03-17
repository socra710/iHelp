import { getServerSession, Session } from 'next-auth';
import Link from 'next/link';
import { GET } from '@/app/api/auth/[...nextauth]/route';
import AuthButton from './AuthButton';

export default async function Header() {
  const session: Session | null = await getServerSession(GET);

  return (
    <header className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          i-Help
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <AuthButton session={session} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
