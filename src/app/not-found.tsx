import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-xl font-bold">죄송합니다. 페이지를 이용할 수 없습니다.</p>
      <p className="mt-2 text-gray-500">
        클릭하신 링크가 잘못되었거나 페이지가 삭제되었을 수 있습니다.
      </p>
      <Link href="/" className="mt-6 px-4 py-2 bg-black text-white rounded-lg">
        돌아가기
      </Link>
    </div>
  );
}
