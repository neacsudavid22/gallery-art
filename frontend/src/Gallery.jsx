import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Gallery = () => {
    const navigate = useNavigate();

    const folders = [
        { title: 'Impressionism', description: 'In addition to their radical technique, the bright colors of Impressionist canvases were shocking for eyes accustomed to the more sober colors of Academic painting.', color: 'success' },
        { title: 'Realism', description: 'Rejecting the idealized classicism of academic art and the exotic themes of Romanticism, Realism was based on direct observation of the modern world.', color: 'primary' },
        { title: 'Romanticism', description: 'In Romantic art, nature with its uncontrollable power, unpredictability, and potential for cataclysmic extremes offered an alternative to the ordered world of Enlightenment thought.', color: 'danger' },
        { title: 'Surrealism', description: 'The cerebral and irrational tenets of Surrealism find their ancestry in the clever and whimsical disregard for tradition fostered by Dadaism a decade earlier.', color: 'warning' }
    ];

    const handleAddPhoto = () => {
        navigate('/add-photo');
    };

    return (
        <Container className="my-5">
            <SearchBar />
            <h2 className="text-center mb-5 display-4">Art Gallery by Movements</h2>
            
            <Row xs={1} md={2} lg={4} className="g-4">
                {folders.map((folder, index) => (
                    <Col key={index}>
                        <Card 
                            bg={folder.color.toLowerCase()} 
                            key={index}
                            text={'white'} 
                            className="mb-2 shadow-lg h-100"
                        >
                            <Card.Header as="h5">{folder.title}</Card.Header>
                            <Card.Body>
                                <Card.Title>{folder.title} Collection</Card.Title>
                                <Card.Text>
                                    {folder.description}
                                </Card.Text>
                                <Button 
                                    onClick={() => navigate(`/collection/${folder.title}`)}
                                    variant="outline-light" 
                                    className="w-100"
                                >
                                    View Collection
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <hr className="my-5" />

            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6} className="text-center">
                    <Button
                        variant="dark"
                        size="lg"
                        className="w-75 p-3 shadow-lg"
                        onClick={handleAddPhoto}
                    >
                        Add New Artwork
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export { Gallery };