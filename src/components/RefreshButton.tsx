"use client";

import { Button } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RefreshButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleShuffle = () => {
    const currentQuery = searchParams.get('q') || '';
    
    const randomPage = Math.floor(Math.random() * 100) + 1;

    if (currentQuery) {
      router.push(`/explore?q=${currentQuery}&page=${randomPage}`);
    } else {
      router.push(`/explore?page=${randomPage}`);
    }
  };

  return (
    <Button variant="warning" onClick={handleShuffle} className="mb-4 fw-bold">
      🔄 Shuffle / Refresh Gambar
    </Button>
  );
}