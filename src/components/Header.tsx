import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { GET } from '@/app/api/auth/[...nextauth]/route';
import AuthButton from './AuthButton';
import { Session } from 'next-auth';

export default async function Header() {
  const session: Session | null = await getServerSession(GET);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          iHelp App
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
