import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PokePlayerState from './contexts/PokePlayerContext';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PokePlayerState>
        <App />
      </PokePlayerState>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);