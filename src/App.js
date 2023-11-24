import React, { useEffect } from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Header from './utils/Header/Header';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { hydrate } from './redux/cart/cart';
import Routing from './Routes';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const cartDataLS = localStorage.getItem("cartProducts");
    if(cartDataLS !== null) {
      dispatch(hydrate(cartDataLS));
    }
  },[]);
  
  return (
    <BrowserRouter>
      <Container maxWidth={false} className='noPadding'>
        <Header />
        <Container maxWidth={false} className='continer-body'>
          <Routing />
        </Container>
      </Container>
    </BrowserRouter>
  );
}

export default App;
