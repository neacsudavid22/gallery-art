import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createArt, getArtById, updateArt } from './api';

const ImageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const loadArtwork = async () => {
      if (id) {
        try {
          const art = await getArtById(id);
          setTitle(art.title || '');
          setDescription(art.description || '');
          setStyle(art.style || '');
          setAuthor(art.author || '');
          setYear(art.year || '');
          setPreview(art.image_blob ? `data:image/jpeg;base64,${art.image_blob}` : null);
          setIsEditMode(true);
        } catch (err) {
          console.error('Error loading artwork:', err);
          alert('Failed to load artwork');
          navigate('/gallery');
        }
      }
    };
    loadArtwork();
  }, [id, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditMode && !imageFile) {
      alert('Please select an image.');
      return;
    }

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append('image_blob', imageFile);
      }
      formData.append('title', title);
      formData.append('description', description);
      formData.append('style', style);
      formData.append('author', author);
      formData.append('year', year);

      let result;
      if (isEditMode) {
        result = await updateArt(id, formData);
      } else {
        result = await createArt(formData);
      }

      console.log('Server response:', result);
      alert(isEditMode ? 'Artwork updated successfully!' : 'Artwork uploaded successfully!');

      if (isEditMode) {
        navigate(`/collection/${style}`);
      } else {
        navigate('/gallery');
      }
    } catch (err) {
      console.error('Error saving art:', err);
      alert(isEditMode ? 'Failed to update artwork' : 'Failed to upload artwork');
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5 display-4">
        {isEditMode ? 'Edit Artwork' : 'Upload an Artwork'}
      </h2>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                min="1000"
                max="9999"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStyle">
              <Form.Label>Style</Form.Label>
              <Form.Select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                required
              >
                <option value="">Select a style...</option>
                <option value="Impressionism">Impressionism</option>
                <option value="Realism">Realism</option>
                <option value="Romanticism">Romanticism</option>
                <option value="Surrealism">Surrealism</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImageUpload">
              <Form.Label>Select Image</Form.Label>
              <Form.Control 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!isEditMode}
              />
            </Form.Group>

            {preview && (
              <div className="text-center mb-3">
                <Image src={preview} alt="Preview" fluid style={{ maxHeight: '300px' }} />
              </div>
            )}

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={() => navigate(-1)} className="w-25">
                Back
              </Button>
              <Button variant="dark" type="submit" className="w-75">
                {isEditMode ? 'Update Artwork' : 'Upload Artwork'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageForm;
