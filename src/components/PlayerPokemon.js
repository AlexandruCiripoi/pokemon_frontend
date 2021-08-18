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


const PlayerPokemon = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { pokePlayer } = useContext(PokePlayerContext)

  
  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (loading) return <Spinner animation='border' variant='primary' />;

  console.log(pokePlayer.name.english)
  return pokePlayer.name.english  ?   <Card >
  <Card.Img variant='top' src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokePlayer.id).padStart(3, '0')}.png`} style={{ objecFit: 'cover' }} />
  <Card.Body>
  <Row>
    <Card.Title className="mr-5">
      <p className="mr-2">{pokePlayer.name.english} </p>
     {pokePlayer.type.map((p, i) => <Badge className="m-1" bg='success' key={i}>{p}</Badge>)}
    </Card.Title>
    </Row>
    <Row>
     <p><b>HP: </b> {pokePlayer.base.HP}</p>
     <p><b>Attack:</b> {pokePlayer.base.Attack}</p>
     <p><b>Defense: </b> {pokePlayer.base.Defense}</p>
     <p><b>Sp. Attack:</b>{pokePlayer.base.Sp[" Attack"]}</p>
     <p><b>Sp. Defense:</b>{pokePlayer.base.Sp[" Defense"]}</p>
     <p><b>Speed:</b>{pokePlayer.base.Attack}</p>
    </Row>
  </Card.Body>
</Card> : <Container>Please choose player</Container>
};

export default PlayerPokemon;