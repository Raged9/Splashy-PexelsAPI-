"use client";

import { useEffect, useState } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';

interface MyPhoto {
  id: number;
  title: string;
  photographer: string;
  description: string;
  imageUrl: string;
  width: number; // Tampilkan info detail
  height: number;
}

export default function GalleryMasonryPage() {
  const [photos, setPhotos] = useState<MyPhoto[]>([]);

  useEffect(() => {
    fetch('/api/photos').then(res => res.json()).then(data => setPhotos(data));
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Your Splashy Feeds (Masonry)</h1>
        <Link href="/dashboard"><Button variant="outline-primary">Go to Dashboard</Button></Link>
      </div>

      <div style={{ columnCount: 3, columnGap: '1.5rem' }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ breakInside: 'avoid', marginBottom: '1.5rem' }}>
            <Card className="border-0 shadow-sm">
              <Card.Img variant="top" src={photo.imageUrl} />
              <Card.Body>
                <Card.Title className="h6">{photo.title}</Card.Title>
                <Card.Text className="small text-muted">{photo.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Badge bg="light" text="dark">{photo.photographer}</Badge>
                  <span style={{ fontSize: '0.7rem' }} className="text-secondary">
                    {photo.width}x{photo.height}px
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      

    </Container>
  );
}