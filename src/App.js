import React from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import Header from './utils/Header/Header';
import Container from '@mui/material/Container';
import Home from './components/home';
import CreateProduct from './components/admin/product/createProduct';
import Signin from './components/user/signin';
import Signup from './components/user/signup';
import Cart from './components/cart/cart';
import Checkout from './components/cart/checkout';
import ProductDetail from './components/product/productDetail';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth={false} className='noPadding'>
        <Header />
        <Container maxWidth={false} className='continer-body'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Container>
      </Container>
    </BrowserRouter>
  );
}

export default App;
