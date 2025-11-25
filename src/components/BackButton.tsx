"use client";

import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button 
      variant="outline-secondary" 
      onClick={() => router.back()}
      className="mb-4"
    >
      &larr; Kembali
    </Button>
  );
}