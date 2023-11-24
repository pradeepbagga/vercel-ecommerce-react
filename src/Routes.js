import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import CreateProduct from './components/admin/product/createProduct';
import Signin from './components/user/signin';
import Signup from './components/user/signup';
import Cart from './components/cart/cart';
import Checkout from './components/cart/checkout';
import ProductDetail from './components/product/productDetail';
import EmailVerify from './components/user/emailVerify';

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/verify/:token" element={<EmailVerify />} />
        </Routes>
    )
}

export default Routing;