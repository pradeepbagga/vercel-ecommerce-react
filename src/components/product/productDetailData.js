import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { addCartItem, removeCartItem } from '../../redux/cart/cart';
import { useSelector, useDispatch } from 'react-redux';

function ProductDetailData({ product }) {
    const {cartProducts} = useSelector((state) => state.cart);
    const [checkCartBtn, setCartBtn] = useState(false);
    let discount = product.price;
    discount = discount / 100;
    discount = discount * product.discountPercentage;
    discount = product.price - discount;

    const dispatch = useDispatch();

    const addCart = () => {
        const data = {
            id: product.id,
            title: product.title,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            price: Math.ceil(discount),
            count:1
        };
        dispatch(addCartItem(data));
    }

    const removeCart = () => {
        dispatch(removeCartItem(product.id));
    }

    const checkProductInCart = (cartProducts,product) => {
        if(cartProducts.length > 0) {
            let idCheck = cartProducts.filter((item) => item.id == product.id);
            console.log('idCheck - ', idCheck);
            console.log('product.id - ', product.id);
            if(idCheck.length == 1) {
                setCartBtn(true);
            }
            if(idCheck.length == 0) {
                setCartBtn(false);
            }
        }
        if(cartProducts.length == 0) {
            setCartBtn(false);
        }
    }

    // useEffect(() => {
    //     console.log('cartProducts - ', cartProducts)
    //     checkProductInCart(cartProducts,product);
    // },[]);

    useEffect(() => {
        console.log('cartProducts 2 - ', cartProducts)
        checkProductInCart(cartProducts,product);
    },[cartProducts,product]);

    return (
        <>
            <h2>{product.title}</h2>
            <div className='ratingContainer'>
                {product.rating}&nbsp;
                <Rating name="read-only" value={product.rating} readOnly />

            </div>
            <hr />
            
            <div className='price'>
                <h2>
                    <span className='discountPercentage'>-{Math.ceil(product.discountPercentage)}%</span>
                    &nbsp;
                    &#8377;{Math.ceil(discount)}

                </h2>
                <div>M.R.P.: <span>&#8377;{product.price}</span></div>
            </div>
            <hr />
            <div>
                {
                    checkCartBtn ? <Button variant="contained" onClick={() => removeCart()}>Remove to Cart</Button> 
                    : <Button variant="contained" onClick={() => addCart()}>Add to Cart</Button> 
                }
            </div>
            <hr />
            <div>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
            </div>
            <hr />
            <div>
                <p><strong>About this item</strong></p>
                {product.description}
            </div>
        </>
    )
}

export default ProductDetailData;