import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Navigation = () => {
  return (
    <Navbar bg='light' expand='lg'className="naviColor">
      <Container >
        <Navbar.Brand className="naviColor" as={Link} to='/'>
          Pokemon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link className="naviColor" as={NavLink} to='/' exact>
              Home
            </Nav.Link>
            <Nav.Link className="naviColor" as={NavLink} to='/game' exact>
              Game
            </Nav.Link>
            <Nav.Link className="naviColor" as={NavLink} to='/battlehistory' exact>
              Battle history
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;