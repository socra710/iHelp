'use client';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import 'froala-editor/css/froala_editor.pkgd.min.css';

type CsrItemProps = {
  id: number;
  user: {
    name: string;
    image: string;
  };
  createdAt: string;
  content: string;
  session: Session | null;
};

export default function CsrItem({ id, user, createdAt, content, session }: CsrItemProps) {
  const handleClick = () => {
    if (session) {
      window.location.href = `/csr/${id}`;
    } else {
      signIn();
    }
  };

  return (
    <article
      className="bg-white border border-gray-300 p-6 rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center mb-4">
        <Image
          src={user.image || '/default-user.png'}
          alt="user"
          className="w-8 h-8 rounded-full cursor-pointer"
          width={32}
          height={32}
        />
        <span className="font-bold ml-1">
          {user.name}{' '}
          <span className="font-normal text-gray-400 ml-2">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </span>
      </div>
      <div className="fr-view mb-4" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
