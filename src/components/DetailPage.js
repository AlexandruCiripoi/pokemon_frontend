  
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const DetailPage = () => {
  const { id } = useParams();
  
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/pokemon/${id}`);
        setPokemon(data);
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
  }, [id, error]);

  if (error) return <Alert variant='danger'>{error}</Alert>;
  return !loading && pokemon ?  (
    <Col>
    <Row>
      <h1>{pokemon.name.english}</h1>
      </Row>
      <Row>
      <img src={"https://assets.pokemon.com/assets/cms2/img/misc/countries/at/country_detail_pokemon.png"} />
    </Row>
    <Row>
      <h2>{pokemon.type.map(t => (<p>{t}</p>))}</h2>
    </Row>
    <Row>
     <p><b>HP: </b> {pokemon.base.HP}</p>
     <p><b>Attack:</b> {pokemon.base.Attack}</p>
     <p><b>Defense: </b> {pokemon.base.Defense}</p>
     <p><b>Sp. Attack:</b>{pokemon.base["Sp. Attack"]}</p>
     <p><b>Sp. Defense:</b>{pokemon.base["Sp. Defense"]}</p>
     <p><b>Speed:</b>{pokemon.base.Attack}</p>
    </Row>
   </Col>): <Spinner/>


};

export default DetailPage;