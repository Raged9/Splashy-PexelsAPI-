"use client";

import { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function EditPhotoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const [title, setTitle] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/photos?id=${id}`);
        if (!res.ok) throw new Error('Gagal mengambil data');
        const data = await res.json();
        
        setTitle(data.title);
        setPhotographer(data.photographer);
        setDesc(data.description || '');
        setUrl(data.imageUrl);
      } catch (err) {
        setError('Foto tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          title, 
          photographer, 
          description: desc, 
          imageUrl: url 
        }),
      });

      if (res.ok) {
        alert('Data berhasil diupdate!');
        router.push('/dashboard');
        router.refresh();
      } else {
        alert('Gagal update data');
      }
    } catch (err) {
      alert('Terjadi kesalahan');
    }
  };

  if (loading) return <Container className="mt-5"><p>Loading...</p></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4">Edit Photo Detail</h2>
        
        <div className="mb-3 text-center">
            <img src={url} alt="Preview" style={{ height: '150px', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>

        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Judul Foto</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Photographer</Form.Label>
            <Form.Control 
              type="text" 
              value={photographer} 
              onChange={(e) => setPhotographer(e.target.value)} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
              type="url" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="success" type="submit" className="flex-grow-1">
              Simpan Perubahan
            </Button>
            <Button variant="secondary" onClick={() => router.push('/dashboard')}>
              Batal
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}