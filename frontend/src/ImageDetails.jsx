import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtById, deleteArt } from './api';
import SearchBar from './SearchBar';

const ImageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [art, setArt] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const data = await getArtById(id);
        setArt(data);
      } catch (err) {
        console.error('Error fetching artwork:', err);
      }
    };
    fetchArt();
  }, [id]);

  const handlePlay = (art) => {
    if (art.audio_blob) {
      const audioUrl = `data:audio/mp3;base64,${art.audio_blob}`;
      const audioObj = new Audio(audioUrl);
      audioObj.play();
      setAudio(audioObj);
    }
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
  };

  const handleModify = (id) => {
     navigate(`/add-photo/${id}`);
   };

  const handleDelete = async (id_art) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      try {
        await deleteArt(id_art);
        navigate('/gallery');
      } catch (err) {
        console.error('Error deleting artwork:', err);
      }
    }
  };

  if (!art || !art.id_art) {
    return (
      <Container className="my-5 text-center">
     <SearchBar />
        <h3>No image found</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
     <SearchBar />
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="danger"
          onClick={() => navigate('/gallery')}
          className="d-flex align-items-center gap-2"
          size="lg"
        >
          <i className="bi bi-arrow-left"></i>
          Back to Gallery
        </Button>
        <h2 className="flex-grow-1 text-center mb-0 display-4">{art.title || 'Untitled'}</h2>
        <div style={{ width: '106px' }}></div>
      </div>

      <Card className="shadow-lg p-4">
        <Row className="align-items-center g-4">
          <Col lg={6} className="text-center">
            {art.image_blob && (
              <Card.Img
                src={`data:image/jpeg;base64,${art.image_blob}`}
                alt={art.title}
                style={{
                  maxHeight: '600px',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '1rem',
                }}
              />
            )}
          </Col>

          <Col lg={6}>
            <Card.Body>
              <Card.Title className="display-6">{art.title || 'Untitled'}</Card.Title>
              <Card.Subtitle className="mb-3 fs-5 text-muted">
                By {art.author || 'Unknown'}
              </Card.Subtitle>
              {art.year && <p><strong>Year:</strong> {art.year}</p>}
              {art.style && <p><strong>Style:</strong> {art.style}</p>}
              {art.description && <p><strong>Description:</strong> {art.description}</p>}

              <p className="text-muted mt-3"><small>ID: {art.id_art}</small></p>

              <div className="d-flex gap-3 mt-4">
                <Button
                  variant="info"
                  onClick={() => handlePlay(art)}
                  disabled={!art.audio_blob}
                >
                  {art.audio_blob ? 'Play Audio Description' : 'No Audio Available'}
                </Button>
                <Button variant="secondary" onClick={handleStop}>
                  Stop Audio
                </Button>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="warning" onClick={() => handleModify(art.id_art)}>
                  Modify
                </Button>
                <Button variant="danger" onClick={() => handleDelete(art.id_art)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ImageDetails;
