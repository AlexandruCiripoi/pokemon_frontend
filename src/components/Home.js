import { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/pokemon');
        setPosts(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        } else {
          setError('Network error');
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        }
      }
    };
    !error && getPosts();
  }, [error]);

  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (loading) return <Spinner animation='border' variant='primary' />;
  return posts.map(post => (
    <Col md={4} className='mb-4' key={post.id}>
      <Card>
        <Card.Img variant='top' src={"https://assets.pokemon.com/assets/cms2/img/misc/countries/at/country_detail_pokemon.png"} style={{ objecFit: 'cover' }} />
        <Card.Body>
          <Card.Title>
            {post.name.english} <Badge bg='success'>{post.type}</Badge>
          </Card.Title>
          <Card.Text>HP:{post.base.HP}</Card.Text>
          <Button variant='primary' as={Link} to={`/${post.id}`}>
            PokeDetails
          </Button>
        </Card.Body>
        <Card.Footer>{post.type}</Card.Footer>
      </Card>
    </Col>
  ));
};

// {post.base}

export default Home;