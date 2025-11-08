import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtByStyle, deleteArt, getArtByTitle } from './api'; 

const ImageGallery = () => {
  const { style } = useParams();
  const { title } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const arts = style ? await getArtByStyle(style) : await getArtByTitle(title);
        setImages(arts);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };
    fetchImages();
  }, [style, title]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      try {
        await deleteArt(id);
        setImages(images.filter(img => img.id_art !== id));
      } catch (err) {
        console.error('Error deleting artwork:', err);
        alert('Failed to delete artwork');
      }
    }
  };

  let audioRef = null;

  const handlePlay = (art) => {
    if (!art.audio_blob) return;
  
    const url = `data:audio/mpeg;base64,${art.audio_blob}`;
  
    audioRef = new Audio(url);
    audioRef.play();
  };
  
const handleStop = () => {
  if (audioRef) {
    audioRef.pause();
    audioRef.currentTime = 0;
  }
};


  const handleModify = (id) => {
    navigate(`/add-photo/${id}`);
  };

  return (
    <Container className="my-5">
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="danger" 
          onClick={() => navigate('/gallery')} 
          className="d-flex align-items-center gap-2"
          size='lg'
        >
          <i className="bi bi-arrow-left"></i>
          Back to Gallery
        </Button>
        <h2 className="flex-grow-1 text-center mb-0 display-4">{style} Collection</h2>
        <div style={{ width: '106px' }}></div>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {images.map((art) => (
          <Col key={art.id_art}>
            <Card className="h-100 shadow-sm d-flex flex-column">
              {art.image_blob && (
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${art.image_blob}`}
                  style={{ objectFit: 'cover', height: '300px' }}
                  onClick={()=>navigate('/art/' + art.id_art)}
                />
              )}
                <Card.Body className="flex-grow-1 d-flex flex-column">
                  <div>
                    <Card.Title>{art.title || 'Untitled'}</Card.Title>
                    <Card.Subtitle className="mb-2">By {art.author || 'Unknown'}</Card.Subtitle>
                    {art.year && (
                      <Card.Text>
                        <small className="text-muted">Year: {art.year}</small>
                      </Card.Text>
                    )}
                    {art.description && <Card.Text>{art.description}</Card.Text>}
                    <Card.Text>
                      <small className="text-muted">ID: {art.id_art}</small>
                    </Card.Text>
                  </div>
                             
              <div className="mt-auto" />

              <div className="d-flex  justify-content-between mt-3">
              <Button variant="info" onClick={() => handlePlay(art)} disabled={!art.audio_blob}>
                { art.audio_blob ? 'Play Audio Description' : 'No Audio Available' }
              </Button>
              <Button variant="secondary" onClick={handleStop}>
                Stop Audio
              </Button>
              </div>   
              </Card.Body>
                <Card.Footer className=" border-1">
                  <div className="d-flex justify-content-between">
                    <Button variant="warning" onClick={() => handleModify(art.id_art)}>
                      Modify
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(art.id_art)}>
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ImageGallery;
