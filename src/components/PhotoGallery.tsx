"use client";

import { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

interface Photo {
  id: number;
  photographer: string;
  width: number;
  height: number;
  src: { medium: string; original: string };
  alt: string;
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const router = useRouter();
  
  // State untuk Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [userDesc, setUserDesc] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setUserDesc('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedPhoto) return;
    setIsSaving(true);

    const photoData = {
      title: selectedPhoto.alt || "Untitled",
      photographer: selectedPhoto.photographer,
      width: selectedPhoto.width,
      height: selectedPhoto.height,
      imageUrl: selectedPhoto.src.original,
      description: userDesc,
    };

    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photoData),
      });

      if (res.ok) {
        setShowModal(false);
        if (confirm("Berhasil disimpan! Cek gallery public sekarang?")) {
            router.push('/gallery'); 
        }
      } else {
        alert("Gagal menyimpan.");
      }
    } catch (e) {
      alert("Error koneksi.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Row>
        {photos.map((photo) => (
          <Col md={4} sm={6} xs={12} key={photo.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src={photo.src.medium} style={{ height: '250px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title className="fs-6 fw-bold">{photo.photographer}</Card.Title>
                <Button variant="outline-dark" size="sm" href={`/explore/${photo.id}`} className="w-100 mb-2">
                  Lihat Detail
                </Button>
                <Button variant="success" size="sm" className="w-100" onClick={() => handleOpenModal(photo)}>
                  Simpan Gambar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Simpan Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhoto && (
            <Form>
              <div className="text-center mb-3">
                <img src={selectedPhoto.src.medium} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px' }} />
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Judul (Auto dari API)</Form.Label>
                <Form.Control type="text" value={selectedPhoto.alt || "Untitled"} readOnly disabled className="bg-light" />
              </Form.Group>
              
              <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Width</Form.Label>
                        <Form.Control type="text" value={selectedPhoto.width} readOnly disabled className="bg-light" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="text" value={selectedPhoto.height} readOnly disabled className="bg-light" />
                    </Form.Group>
                </Col>
              </Row>

              {/* Field USER INPUT (Bisa Diedit) */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold text-primary">Deskripsi Anda</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder="Tuliskan alasan anda menyimpan foto ini..."
                  value={userDesc}
                  onChange={(e) => setUserDesc(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Menyimpan...' : 'Simpan Sekarang'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}