import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect, Fragment } from 'react';
import axios from 'axios'; 
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const BattleHistory = () => {
    const [stats, setStats] = useState();
    const [lastDeleted, setLastDeleted] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
  
      const getPosts = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`http://localhost:5000/stat/`);
          setStats(data);
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
    }, [ error, lastDeleted]);

    const handleClickedButton= async (e) => {
        const id = e.target.id;
        console.log(id)
        const { data } = await axios.delete(`http://localhost:5000/stat/${id}`);
        setLastDeleted(data)
        console.log(data)
      } 

    if (error) return <Alert variant='danger'>{error}</Alert>;
    if (loading) return <Spinner animation='border' variant='primary' />;
  return !loading &&  stats ? (
    <Fragment>
        <Row className="mb-3">
        <Col className="tableHead" md={2}>Winner</Col>
        <Col className="tableHead" md={2} >Loser</Col>
        <Col className="tableHead" md={2} >Battle category</Col>
        <Col className="tableHead" md={2} >Date</Col>
        </Row>
      {stats.map(stat => (
          <Row className="mb-1">
    <Col md={2} >{stat.winner}</Col>
    <Col md={2} >{stat.loser}</Col>
    <Col md={2} >{stat.battleCategory}</Col>
    <Col md={2} >{stat.date}</Col>
    <Col md={2} ><Button id={stat._id} onClick={handleClickedButton}>Delete</Button></Col>
    </Row>
  ))}
      
    
    </Fragment>):  <Spinner animation='border' variant='primary' />


};

export default BattleHistory;