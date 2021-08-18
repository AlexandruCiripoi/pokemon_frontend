import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';
import Home from './components/Home';
import DetailPage from './components/DetailPage';
import SuperDetailed from './components/SuperDetailed';
import Game from './components/Game';
import BattleHistory from './components/BattleHistory';
import './App.css';

const App = () => {
  return (
    <main>
      <Navigation />
      <Container>
        <Row className='mt-5 justify-content-center'>
          <Switch>
              <Route exact path='/' ><Home/></Route>
              <Route exact path='/game'><Game/></Route>
              <Route exact path='/battlehistory'><BattleHistory/></Route>
              <Route exact path='/pokemons/:id' ><DetailPage/></Route>
              <Route exact path='/:id/:info' component={SuperDetailed} />
            </Switch>
        </Row>
      </Container>
    </main>
  );
};

export default App;
