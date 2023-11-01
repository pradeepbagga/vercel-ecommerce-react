import React, { Component } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import "./cart.scss";

class Cart extends Component {
    render() {
        return (
            <div className='shopping-cart'>
                <div className='cart-header'>
                    <h2>Shopping Cart</h2>
                    <h4>3 items</h4>
                </div>

                <div className='container-cart-rows'>

                    <div className='cart-row'>
                        <div className='cart-img'>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp" />
                        </div>
                        <div className='title'>
                            <h3>Shirt</h3>
                        </div>
                        <div className='count-change'>
                            <RemoveIcon />
                            <TextField id="standard-basic" label="Standard" variant="standard" />
                            <AddIcon />
                        </div>
                        <div className='price'>
                            € 44.00
                        </div>
                        <div className='delete'>
                            <DeleteIcon />
                        </div>
                    </div>
                    <div className='cart-row'>
                        <div className='cart-img'>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp" />
                        </div>
                        <div className='title'>
                            <h3>Shirt</h3>
                        </div>
                        <div className='count-change'>
                            <RemoveIcon />
                            <TextField id="standard-basic" label="Standard" variant="standard" />
                            <AddIcon />
                        </div>
                        <div className='price'>
                            € 44.00
                        </div>
                        <div className='delete'>
                            <DeleteIcon />
                        </div>
                    </div>
                    <div className='cart-row'>
                        <div className='cart-img'>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp" />
                        </div>
                        <div className='title'>
                            <h3>Shirt</h3>
                        </div>
                        <div className='count-change'>
                            <RemoveIcon />
                            <TextField id="standard-basic" label="Standard" variant="standard" />
                            <AddIcon />
                        </div>
                        <div className='price'>
                            € 44.00
                        </div>
                        <div className='delete'>
                            <DeleteIcon />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default Cart;
