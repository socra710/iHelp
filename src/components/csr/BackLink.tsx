'use client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackLink() {
  const router = useRouter();

  const handleBackClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.back();
  };

  return (
    <a href="#" className="inline-flex items-center font-bold" onClick={handleBackClick}>
      <FontAwesomeIcon icon={faArrowLeft} className="mr-3 text-sm" style={{ minWidth: '16px' }} />
    </a>
  );
}
