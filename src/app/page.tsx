"use client";

import { Container, Card, Button, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center shadow-sm">
            <Card.Body> 
              <div className="my-4">
                <h3>Nama: Christopher Edgar</h3>
                <h4>NIM: 535240053</h4>
              </div>

              <Card.Text className="lead">
                Topik Project: <strong>Publish Foto (SplashAPI)</strong> 
              </Card.Text>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}