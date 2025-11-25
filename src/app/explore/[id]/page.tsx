import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import BackButton from '@/components/BackButton';

interface PexelsDetail {
  id: number;
  width: number;
  height: number;
  url: string; 
  photographer: string;
  avg_color: string;
  alt: string;
  src: {
    large2x: string
    original: string;
  };
}

async function getPhotoDetail(id: string): Promise<PexelsDetail> {
  const apiKey = process.env.PEXELS_API_KEY;
  
  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: { Authorization: apiKey! },
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Failed to fetch detail');
  
  return res.json();
}

export default async function ExploreDetailPage({ params }: { params: { id: string } }) {
  const photo = await getPhotoDetail(params.id);

  return (
    <Container className="mt-5 mb-5">
      <BackButton />
      
      <Row>
        <Col md={8} className="mb-4">
            <div className="shadow-sm rounded overflow-hidden">
                <img 
                    src={photo.src.large2x} 
                    alt={photo.alt} 
                    className="img-fluid w-100" 
                />
            </div>
        </Col>

        <Col md={4}>
            <Card className="border-0 shadow-sm p-4 sticky-top" style={{ top: '20px' }}>
                <h2 className="h4 mb-3 fw-bold">{photo.alt || "Untitled Photo"}</h2>
                <p className="text-muted">By <strong className="text-dark">{photo.photographer}</strong></p>
                <hr />
                
                <h5 className="mb-3 text-primary fw-bold">Details</h5>
                <Table striped bordered hover size="sm" className="small">
                    <tbody>
                        <tr>
                            <td className="fw-bold">ID</td>
                            <td>{photo.id}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Resolution</td>
                            <td>{photo.width} x {photo.height} px</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Color</td>
                            <td>
                                <span style={{
                                    display:'inline-block', 
                                    width:'12px', 
                                    height:'12px', 
                                    backgroundColor: photo.avg_color, 
                                    marginRight:'8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '50%'
                                }}></span>
                                {photo.avg_color}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Source</td>
                            <td>
                                {photo.url ? (
                                    <a 
                                        href={photo.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                    >
                                        Redirecting to Pexels Page...
                                    </a>
                                ) : (
                                    <span className="text-muted">-</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}