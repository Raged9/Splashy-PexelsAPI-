import { Container } from 'react-bootstrap';
import PhotoGallery from '@/components/PhotoGallery'; 
import SearchBar from '@/components/SearchBar';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  photographer: string;
  src: {
    medium: string;
    original: string;
  };
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

async function getPexelsPhotos(query?: string, page: string = '1'): Promise<PexelsPhoto[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    throw new Error('PEXELS_API_KEY is missing');
  }

  const pageNumber = parseInt(page) || 1;
  let url = '';

  if (query) {
    url = `https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${pageNumber}`;
  } else {
    url = `https://api.pexels.com/v1/curated?per_page=30&page=${pageNumber}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch photos');
  }

  const data: PexelsResponse = await res.json();
  return data.photos;
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const query = searchParams.q;
  const page = searchParams.page || '1';

  const photos = await getPexelsPhotos(query, page);

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mb-4 text-center fw-bold">
        {query ? `Hasil: "${query}" (Hal. ${page})` : "Inspiration Feed"}
      </h1>
      
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <SearchBar />
      </div>

      <p className="text-center text-muted mb-5">
        API by Pexels API
      </p>

      <PhotoGallery photos={photos} />
      
    </Container>
  );
}