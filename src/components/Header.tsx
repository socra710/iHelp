import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          iHelp App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">
                홈
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                소개
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-300">
                블로그
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                연락처
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
