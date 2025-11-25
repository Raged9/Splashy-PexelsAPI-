"use client";

import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${query}&page=1`);
    }
  };

  const handleShuffle = () => {
    const currentQuery = searchParams.get('q') || '';
    
    const randomPage = Math.floor(Math.random() * 100) + 1;

    if (currentQuery) {
      router.push(`/explore?q=${currentQuery}&page=${randomPage}`);
    } else {
      router.push(`/explore?page=${randomPage}`);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Form onSubmit={handleSearch} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Cari foto... (ex: Nature, Car)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Cari
        </Button>
        <Button variant="warning" type="button" onClick={handleShuffle}>
          Randomize Gambar
        </Button>
      </InputGroup>
    </Form>
  );
}