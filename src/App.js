import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';
import Home from './components/Home';
import DetailPage from './components/DetailPage';
import SuperDetailed from './components/SuperDetailed';
import Game from './components/Game';
import './App.css';

const App = () => {
  return (
    <main>
      <Navigation />
      <Container>
        <Row className='mt-5 justify-content-center'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/game' component={Game} exact/>
            <Route exact path='/:id' component={DetailPage} exact/>
            <Route exact path=':id/:info' component={SuperDetailed} />
            
            <Route />
          </Switch>
        </Row>
      </Container>
    </main>
  );
};

export default App;
