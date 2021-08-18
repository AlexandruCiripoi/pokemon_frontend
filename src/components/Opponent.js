import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { PokePlayerContext } from "../contexts/PokePlayerContext.js"
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';


const Opponent = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { opponent, setOpponent  } = useContext(PokePlayerContext)

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/pokemon/`);
        let randomPlayer = Math.floor(Math.random() * 803) + 1
        setOpponent(data.items[randomPlayer]);
        console.log(randomPlayer)
        console.log(data.items)
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

  return opponent.name.english   ?   <Card >
  <Card.Img variant='top' src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(opponent.id).padStart(3, '0')}.png`} style={{ objecFit: 'cover' }} />
  <Card.Body>
  <Row>
    <Card.Title className="mr-5">
      <p className="mr-2">{opponent.name.english} </p>
     {opponent.type.map((p, i) => <Badge className="m-1" bg='success' key={i}>{p}</Badge>)}
    </Card.Title>
    </Row>
    <Row>
     <p><b>HP: </b> {opponent.base.HP}</p>
     <p><b>Attack:</b> {opponent.base.Attack}</p>
     <p><b>Defense: </b> {opponent.base.Defense}</p>
     <p><b>Sp. Attack:</b>{opponent.base.Sp[" Attack"]}</p>
     <p><b>Sp. Defense:</b>{opponent.base.Sp[" Defense"]}</p>
     <p><b>Speed:</b>{opponent.base.Attack}</p>
    </Row>
  </Card.Body>
</Card> : <Container>Please choose player</Container>
};

export default Opponent;