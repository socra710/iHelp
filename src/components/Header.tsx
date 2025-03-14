'use client';
import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session?.user?.id);
    console.log(session?.user?.name);
    console.log(session?.user?.email);
  }, [session]);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          iHelp App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              {session ? (
                <>
                  <div>
                    {`${session.user?.name}님`} <span onClick={() => signOut()}>로그아웃</span>
                  </div>
                </>
              ) : (
                <div onClick={() => signIn()}>로그인</div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
