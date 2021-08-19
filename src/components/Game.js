import { useContext, useState, useEffect, Fragment } from 'react';
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
import PlayerPokemon from './PlayerPokemon';
import Opponent from './Opponent';
import logo from './logo.png'

const Game = () => {

  const categories = ["HP", "Attack", "Defense", "Speed"]

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [winnerState, setWinnerState] = useState();
  const [loserState, setLoserState] = useState();
  const [categoryState, setCategorysState] = useState();
  const { pokePlayer, opponent } = useContext(PokePlayerContext)

  useEffect(() => {
  
    const postStat = async () => {
      console.log(winnerState)
      console.log(loserState)
      try {
        setLoading(true);
        const battleLog = {
          winner: `${winnerState}`,
          loser: `${loserState}`,
          battleCategory: `${categoryState}`
        }
        const { data } = await axios.post(`http://localhost:5000/stat`, battleLog);
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
    !error && winnerState && loserState && postStat();
  }, [ error, winnerState, loserState]);

  const handleClickedBall= async () => {
    const cat = Math.floor(Math.random() * 4)
    setCategorysState(categories[cat])
    if (parseInt(pokePlayer.base[categoryState]) > parseInt(opponent.base[categoryState]) ) {   
      setWinnerState(pokePlayer.name.english)
      setLoserState(opponent.name.english)
    } else {
      setLoserState(pokePlayer.name.english)
      setWinnerState(opponent.name.english)
    }
  } 
  
  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (loading) return <Spinner animation='border' variant='primary' />;

  console.log(pokePlayer.name.english)
  return pokePlayer.name.english ? 
  <Container className='gameScreen'> 
    <Col md={3} className='mb-4 d-flex justify-content-center'>
      <PlayerPokemon></PlayerPokemon>
  </Col>
  <Col md={3} className='mb-4'>
  <button className='clickBall' onClick={handleClickedBall}>
  <img src={logo}/>
</button>
{categoryState ? <Row>The current category selectd: {categoryState}</Row> : <Row></Row>}
{winnerState ? <Row className="winnerClass">{winnerState} wins!</Row> : <Row></Row>}
  </Col>
  <Col md={3} className='mb-4'>
     <Opponent></Opponent>
  </Col>
</Container> 
     : 
     <Button variant='primary' className="m-2" as={Link} to={`/`}>
    Please choose Pokemon
  </Button>
};

export default Game;