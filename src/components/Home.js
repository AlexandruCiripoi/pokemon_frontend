import Pagination from '@material-ui/lab/Pagination';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';



const Home= () => {
  const [page, setPage] = useState(0)
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toSkip = page*10 
  let pageLimit = 10
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/pokemon/?skip=${toSkip}&limit=10`);
        setPokemons(data.items);
        console.log(data.items)
        setLoading(false);
        pageLimit = Math.ceil(data.total/10)
        console.log(pageLimit)
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
  }, [error, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (loading) return <Spinner animation='border' variant='primary' />;

  return !loading  ? (<Container >
    <Container >
      {pokemons.map(pokemon => (
    <Col md={4} className='mb-4' key={pokemon.id}>
      <Card>
        <Card.Img variant='top' src={"https://assets.pokemon.com/assets/cms2/img/misc/countries/at/country_detail_pokemon.png"} style={{ objecFit: 'cover' }} />
        <Card.Body>
          <Card.Title className="mr-5">
            <p className="mr-2">{pokemon.name.english} </p>
           {pokemon.type.map(p => <Badge className="mr-5" bg='success'>{p}</Badge>)}
          </Card.Title>
          <Card.Text>HP:{pokemon.base.HP}</Card.Text>
          <Button variant='primary' as={Link} to={`/${pokemon.id}`}>
            PokeDetails
          </Button>
        </Card.Body>
        <Card.Footer>{pokemon.type}</Card.Footer>
      </Card>
    </Col>
  ))}
      
    </Container>
    <Pagination count={pageLimit} page={page} onChange={handleChange} />
    </Container>
  ) : <Spinner animation='border' variant='primary' />
}

export default Home;