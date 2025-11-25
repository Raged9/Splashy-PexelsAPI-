"use client";

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import Link from 'next/link';

interface MyPhoto {
  id: number;
  title: string;
  photographer: string;
  description: string;
  imageUrl: string;
}

export default function DashboardPage() {
  const [photos, setPhotos] = useState<MyPhoto[]>([]);
  
  const [title, setTitle] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/photos');
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          photographer, 
          description: desc, 
          imageUrl: url 
        }),
      });

      if (res.ok) {
        setTitle('');
        setPhotographer('');
        setDesc('');
        setUrl('');
        
        fetchPhotos(); 
        alert('Foto berhasil disimpan ke galeri');
      } else {
        alert('Pastikan semua kolom terisi');
      }
    } catch (error) {
      alert('Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah anda yakin ingin menghapus foto ini?')) return;
    
    try {
      const res = await fetch(`/api/photos?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPhotos();
      } else {
        alert('Gagal menghapus data.');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghapus.');
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted">Manage your personal feeds collection & ideas.</p>
        </div>
        <Badge bg="primary" className="fs-6 px-3 py-2">
          Total: {photos.length} Photos
        </Badge>
      </div>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card className="p-4 shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <h5 className="mb-4 text-primary fw-bold"> Add New Photo</h5>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Judul Foto (Title)</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Masukkan judul foto..."
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nama Fotografer</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nama anda / sumber..."
                  value={photographer} 
                  onChange={(e) => setPhotographer(e.target.value)} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL (Link)</Form.Label>
                <Form.Control 
                  type="url" 
                  placeholder="https://..." 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  required 
                />
                <Form.Text className="text-muted" style={{ fontSize: '0.8rem' }}>
                  *Copy "Image Address"
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder="Ceritakan tentang foto ini..."
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2 fw-bold" disabled={loading}>
                {loading ? 'Sedang Menyimpan...' : 'Simpan ke Galeri'}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={8}>
          <Row>
            {photos.map((item) => (
              <Col md={6} lg={6} key={item.id} className="mb-4">
                <Card className="h-100 shadow-sm border-0 overflow-hidden photo-card">
                  <div style={{ position: 'relative' }}>
                    <Card.Img 
                      variant="top" 
                      src={item.imageUrl} 
                      style={{ height: '220px', objectFit: 'cover'}} 

                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found"}}
                    />
                    <Badge bg="dark" style={{ position: 'absolute', top: 10, right: 10, opacity: 0.85 }}>
                        {item.photographer}
                    </Badge>
                  </div>
                  
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h5 fw-bold">{item.title}</Card.Title>
                    <Card.Text className="text-secondary small flex-grow-1">
                      {item.description || "Tidak ada deskripsi."}
                    </Card.Text>
                    
                    <hr className="my-3" />
                    
                    <div className="d-flex gap-2">
                      <Link href={`/dashboard/edit/${item.id}`} passHref legacyBehavior>
                         <Button variant="outline-primary" size="sm" className="flex-grow-1">
                            Edit
                         </Button>
                      </Link>

                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {photos.length === 0 && (
              <Col>
                <Alert variant="info" className="text-center py-5">
                  <h4>Galeri masih kosong</h4>
                  <p>Silakan masukkan data foto terlebih dahulu</p>
                </Alert>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}