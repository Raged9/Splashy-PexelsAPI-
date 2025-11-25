import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { HouseDoor, Compass } from 'react-bootstrap-icons';

export default function NotFound() {
  return (
    <div 
      className="d-flex align-items-center justify-content-center text-white"
      style={{ 
        backgroundColor: '#212529', 
        minHeight: '100vh',
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={6} className="text-center mb-5 mb-md-0">
            <img 
              src="/images/typing404_.gif" 
              alt="Page Not Found" 
              className="img-fluid" // Agar responsif di HP
              style={{ minHeight: '400px', objectFit: 'contain' }}
            />
          </Col>
          <Col md={6} className="text-center text-md-start">
            
            <h1 
              className="display-1 fw-bold" 
              style={{ 
                color: '#0dcaf0',
                textShadow: '0 0 20px rgba(13, 202, 240, 0.5)',
                fontSize: '8rem',
                lineHeight: '1'
              }}
            >
              404
            </h1>
            <h2 className="fw-bold mb-3 mt-2">Page Not Found!</h2>
            <p className="lead mb-5 text-muted">
              Oops! Sepertinya halaman yang kamu cari typo atau sudah dihapus. 
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <Link href="/" passHref legacyBehavior>
                <Button variant="primary" size="lg" className="rounded-pill px-4 d-flex align-items-center gap-2">
                  <HouseDoor /> Kembali ke Home
                </Button>
              </Link>
              <Link href="/explore" passHref legacyBehavior>
                <Button variant="outline-light" size="lg" className="rounded-pill px-4 d-flex align-items-center gap-2">
                  <Compass /> Explore API
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}