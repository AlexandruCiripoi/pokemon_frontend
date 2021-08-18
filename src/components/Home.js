import Pagination from '@material-ui/lab/Pagination';
import Container from 'react-bootstrap/Container';
import { useContext, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Search from './Search';
import { PokePlayerContext } from "../contexts/PokePlayerContext.js"



const Home= () => {
  const [page, setPage] = useState(1)
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { pokePlayer, setPokePlayer } = useContext(PokePlayerContext)
  const [pageLimit, setPageLimit] = useState(10)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const toSkip = page*12 - 11
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/pokemon/?skip=${toSkip}&limit=12`);
        setPokemons(data.items);
        console.log(data.items)
        console.log(pokemons);
        setLoading(false);
        setPageLimit(Math.ceil((data.total/12)))
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
    !error && getPokemons();
  }, [error, page]);

  useEffect(() => {
    const getPokemonsByType = async () => {
      try {
        setLoading(true);
        console.log(search)
        const { data } = await axios.get(`http://localhost:5000/pokemon/type/${search}`);
        setPokemons(data.items);
        console.log(data.items);
        console.log(pokemons);
        console.log(search);
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
    !error && search &&  getPokemonsByType();
  }, [error, search]);


  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClickedButton= (e) => {
    const id = e.target.id;
    let currentPlayer = pokemons.filter(word => word.id == id )
    setPokePlayer(currentPlayer[0]);
  } 
  

  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (loading) return <Spinner animation='border' variant='primary' />;

  return !loading && pokemons ? (
    <Fragment  >
      <Search search={search} setSearch={setSearch}></Search>
      {pokemons.map(pokemon => (
    <Col md={4} className='mb-4' key={pokemon.id}>
      <Card >
        <Card.Img variant='top' src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, '0')}.png`} style={{ objecFit: 'cover' }} />
        <Card.Body>
          <Card.Title className="mr-5">
            <p className="mr-2">{pokemon.name.english} </p>
           {pokemon.type.map((p, i) => <Badge className="m-1" bg='success' key={i}>{p}</Badge>)}
          </Card.Title>
          <Card.Text>HP:{pokemon.base.HP}</Card.Text>
          <Button variant='primary' className="m-2" as={Link} to={`/pokemons/${pokemon.id}`}>
            PokeDetails
          </Button>
          {pokemon.id == pokePlayer.id ? <h5 className="currentPlayer">Current player!</h5>:<Button  variant="primary" id={pokemon.id} onClick={handleClickedButton}>Choose Pokemon Player</Button>}
        </Card.Body>

      </Card>
    </Col>
  ))}
      
    <Container className="justify-content-center d-flex">
    <Pagination className="mb-5" count={pageLimit} page={page} onChange={handleChange} />
    </Container>
    </Fragment>
  ) : <Spinner animation='border' variant='primary' />
}

export default Home;