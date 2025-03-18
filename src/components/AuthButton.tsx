'use client';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import Image from 'next/image';

interface AuthButtonProps {
  session: Session | null;
}

export default function AuthButton({ session }: AuthButtonProps) {
  return (
    <div>
      {session ? (
        <Image
          src={session.user?.image || '/default-user.png'}
          alt="user"
          className="rounded-full cursor-pointer"
          width={32}
          height={32}
          onClick={() => signOut()}
        />
      ) : (
        <div className="cursor-pointer" onClick={() => signIn()}>
          로그인
        </div>
      )}
    </div>
  );
}
