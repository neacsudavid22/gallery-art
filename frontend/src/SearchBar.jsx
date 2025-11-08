import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [artSearch, setArtSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = artSearch.trim();

    if (!searchValue) return; 

    if (!isNaN(searchValue) && Number.isInteger(Number(searchValue))) {
      navigate(`/art/${searchValue}`);
    } else {
      navigate(`/collection/art/${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-center m-4 p-3 rounded-3 shadow-sm">
      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '500px' }}>
        <Row className="align-items-center g-1">
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Enter artwork ID or title..."
              value={artSearch}
              onChange={(e) => setArtSearch(e.target.value)}
              className="rounded-2 px-3 py-1 fs-6"
            />
          </Col>
          <Col xs={4}>
            <Button
              type="submit"
              variant="primary"
              className="w-100 rounded-2 px-3 py-1 fs-6"
            >
              <i className="bi bi-search me-1"></i> Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
};

export default SearchBar;
