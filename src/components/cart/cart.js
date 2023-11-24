import React, { useEffect, useState } from 'react';
import "./cart.scss";
import { useSelector } from 'react-redux';
import CartRow from './cartRow';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartProducts } = useSelector((state) => state.cart);
    // console.log('cartProducts - ', cartProducts);
    const [products, setProducts] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    const subTotal = (data) => {
        let total = 0;
        if (data.length > 0) {
            data.map((item) => {
                total += item.count * item.price;
            });
            setGrandTotal(total);
        }
    }

    useEffect(() => {
        setProducts(cartProducts);
        subTotal(cartProducts);
    }, [cartProducts]);

    console.log('products - ', products)

    return (
        <>
            <div className='shopping-cart'>


                <div className='container-cart-rows'>
                    {
                        products.length > 0 ? (<>
                            <div className='cart-header'>
                                <h2>Shopping Cart</h2>
                                <h4>3 items</h4>
                            </div>
                            <div className='cart-row row-heading'>
                                <div className='cart-img'>&nbsp;</div>
                                <div className='title'>Product</div>
                                <div className='price'>Price</div>
                                <div className='count-change'>Quantity</div>
                                <div className='price-delete'>Total</div>
                            </div>
                            {
                                products.map((item, index) => {
                                    return (<CartRow item={item} key={index} />)
                                })
                            }
                            <div className='cart-total-row'>
                                <div>
                                    <strong>Total Items in Cart</strong>
                                </div>
                                <div>
                                    <strong>{products.length}</strong>
                                </div>
                            </div>
                            <div className='cart-total-row'>
                                <div>
                                    <strong>Grand Total</strong>
                                </div>
                                <div>
                                    <strong>&#8377;{grandTotal}</strong>
                                </div>
                            </div>
                            <div>
                                <Button variant="contained" fullWidth={true}>Checkout</Button>
                            </div>
                            <p>&nbsp;</p>
                            <p className='text-center'>or <Link to="/">Continue Shopping</Link></p>
                        </>) : (<div className='cart-no-content'>No product added.</div>)
                    }
                </div>

            </div>
        </>
    )
}

export default Cart;