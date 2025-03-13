import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <p className="text-xl mb-6">Next.js로 iHelp App 만들기</p>
        <Link
          href="/blog"
          className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100"
        >
          CSR 현황 보기
        </Link>
      </section>
    </div>
  );
}
