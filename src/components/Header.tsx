import { getServerSession, Session } from 'next-auth';
import Link from 'next/link';
import AuthButton from './AuthButton';
import SomeComponent from './SomeComponent';

export default async function Header() {
  const session: Session | null = await getServerSession();

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
            <li>
              <SomeComponent />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
