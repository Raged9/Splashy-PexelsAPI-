"use client";

import { Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MyNavbar() {
  const pathname = usePathname();

  return (
    <>
      <Navbar 
        bg="dark"
        data-bs-theme="dark" 
        expand="lg" 
        className="shadow sticky-top mb-4 py-3"
      >
        <Container>
          <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
            <img
              alt="Logo"
              src="/images/logo.png"
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
            />
            <span className="fw-bold text-white letter-spacing-1">
                Splashy
                {/* Gunakan style={{ color: ... }} */}
                <span className="fw-bold" style={{ color: '#69d4eaff' }}>.</span>
            </span>
            </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link 
                as={Link} 
                href="/" 
                className={`nav-link-custom ${pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                href="/explore" 
                className={`nav-link-custom ${pathname.startsWith('/explore') ? 'active' : ''}`}
              >
                Explore
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                href="/gallery" 
                className={`nav-link-custom ${pathname.startsWith('/gallery') ? 'active' : ''}`}
              >
                Gallery
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                href="/dashboard" 
                className={`nav-link-custom ${pathname.startsWith('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}