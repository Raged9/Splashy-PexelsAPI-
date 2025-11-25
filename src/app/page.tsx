"use client";

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiBootstrap, 
  SiSqlite, 
  SiPexels 
} from "react-icons/si";

export default function Home() {
  return (
    <div style={{ backgroundColor: '#212529', minHeight: '100vh' }} className="text-white">
      <div 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/bg-gif.gif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '160px 0',
          marginBottom: '60px'
        }} 
        className="text-center shadow"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h1 className="display-3 fw-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Welcome to Splashy.
              </h1>
              <p className="lead text-white opacity-75 fs-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Website galeri untuk fotografi modern yang menghubungkan inspirasi untuk feeds anda.
              </p>
              <div className="mt-4">
                <Link href="/explore" passHref legacyBehavior>
                    <Button variant="primary" size="lg" className="me-3 px-4 fw-bold">Mulai Menjelajah</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="pb-5">
        <Row className="align-items-center my-5 py-4">
          <Col md={6} className="mb-4 mb-md-0 text-center">
            <img 
              src="images/typing.gif"
              className="shadow-lg"
              style={{ maxWidth: '500px', border: '5px solid #ffffffff' }}
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold text-info mb-4">Personal Information</h2>
            <Card 
              className="shadow-lg text-white"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: '16px'
              }}
            >
              <Card.Body className="p-4">
                <h3 className="display-6 fw-bold mb-2">Christopher Edgar</h3>
                <div className="d-flex align-items-center mb-4">
                  <span className="text-secondary me-2">NIM:</span>
                  <span className="fs-4 text-info fw-bold" style={{ fontFamily: 'monospace' }}>
                    535240053
                  </span>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="my-5" style={{ borderColor: 'white', opacity: 0.1 }} />

        <Row className="align-items-center my-5 py-4">
          <Col md={6} className="order-md-2 mb-4 mb-md-0">
            <img 
              src="https://css-irl.info/masonry-syntax_1400.webp" 
              alt="Project Topic" 
              className="img-fluid rounded shadow-lg opacity-75"
            />
          </Col>
          <Col md={6} className="order-md-1">
            <h2 className="fw-bold text-success mb-3">About</h2>
            <h3 className="fw-bold text-white mb-3">Splashy - Feeds Ideas</h3>
            <p className="lead" style={{ color: '#d1d1d1', lineHeight: '1.6' }}>
              Sebuah platform menyimpan galeri foto modern yang terinspirasi dari Unsplash! 
              Website ini dirancang untuk mempublikasikan karya fotografi dan menemukan ide-ide baru dari fotografer lainnya.
            </p>

            <ul style={{ color: '#d1d1d1' }} className="mt-4">
              <li className="mb-3">
                <strong>Explore:</strong> Menjelajahi foto-foto berkualitas tinggi secara <em>real-time</em> melalui integrasi <em>Pexels API</em>.
              </li>
              <li className="mb-3">
                <strong>Dashboard:</strong> Fitur manajemen konten untuk menyimpan foto favorit Anda ke dalam database pribadi (SQLite) dan mengelolanya (CRUD) dengan mudah.
              </li>
            </ul>

            <div className="mt-4">
              <Link href="/explore" passHref legacyBehavior>
                  <Button variant="outline-success" className="me-2 rounded-pill px-4">Coba Explore API</Button>
              </Link>
                <Link href="/dashboard" passHref legacyBehavior>
                  <Button variant="success" className="rounded-pill px-4">Lihat Dashboard</Button>
              </Link>
            </div>
          </Col>
        </Row>

        <hr className="my-5" style={{ borderColor: 'white', opacity: 0.1 }} />

        <Row className="align-items-center my-5 py-4">
          <Col md={6} className="mb-4 mb-md-0">
            <img 
              src="/images/techstacks.png" 
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold text-warning mb-4">Modern Tech Stack</h2>
            <p className="mb-4" style={{ color: '#d1d1d1' }}>
              Dibangun menggunakan teknologi mutakhir dengan logo asli dari masing-masing dokumentasi resmi.
            </p>
            
            <div className="d-flex flex-wrap gap-4 mt-4 justify-content-center justify-content-md-start">
                <div className="text-center">
                    <SiNextdotjs size={40} className="text-white mb-2" />
                    <br/><small>Next.js 14</small>
                </div>
                <div className="text-center">
                    <SiReact size={40} style={{ color: '#61DAFB' }} className="mb-2" />
                    <br/><small>React</small>
                </div>
                <div className="text-center">
                    <SiTypescript size={40} style={{ color: '#3178C6' }} className="mb-2" />
                    <br/><small>TypeScript</small>
                </div>
                <div className="text-center">
                    <SiBootstrap size={40} style={{ color: '#7952B3' }} className="mb-2" />
                    <br/><small>Bootstrap</small>
                </div>
                <div className="text-center">
                    <SiSqlite size={40} style={{ color: '#003B57' }} className="bg-light rounded p-1 mb-2" /> 
                    <br/><small>SQLite</small>
                </div>
                <div className="text-center">
                    <SiPexels size={40} style={{ color: '#05A081' }} className="mb-2" />
                    <br/><small>Pexels API</small>
                </div>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  );
}
        