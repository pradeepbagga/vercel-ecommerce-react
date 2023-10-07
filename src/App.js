import React from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Header from './utils/Header/Header';
import Container from '@mui/material/Container';
import Home from './components/home';
import CreateProduct from './components/admin/product/createProduct';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth={false} className='noPadding'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
