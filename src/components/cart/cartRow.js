import React, { useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { productCountChange } from '../../redux/cart/cart';

const CartRow = ({ item }) => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    const countIncrease = () => {
        const newCount = count + 1;
        setCount(newCount);
        const data = {
            id: item.id,
            title: item.title,
            brand: item.brand,
            category: item.category,
            thumbnail: item.thumbnail,
            price: item.price,
            count: newCount,
        }
        dispatch(productCountChange(data));
    }
    const countDecrease = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            const data = {
                id: item.id,
                title: item.title,
                brand: item.brand,
                category: item.category,
                thumbnail: item.thumbnail,
                price: item.price,
                count: newCount,
            };
            dispatch(productCountChange(data));
        }
    }

    const altText = (text) => {
        return `image of ${text}`
    }

    useEffect(() => {
        setCount(item.count)
    }, [item]);

    return (
        <>
            <div className='cart-row'>
                <div className='cart-img'>
                    <img src={item.thumbnail}
                        alt={altText(item.title)}
                        title={altText(item.title)}
                    />
                </div>
                <div className='title'>
                    <h3>{item.title}</h3>
                    <p>{item.brand} - {item.category}</p>
                </div>
                <div className='price'>
                    &#8377;{item.price}
                </div>
                <div className='count-change'>
                    <RemoveIcon onClick={() => countDecrease()} />
                    <TextField
                        id="outlined-basic"
                        type="number"
                        variant="outlined"
                        size="small"
                        value={count} />
                    <AddIcon onClick={() => countIncrease()} />
                </div>

                <div className='price-delete'>

                    <p>&#8377;{item.price * count}</p>
                    <p>
                        {/* <Button variant="contained">Remove</Button> */}
                        <span className='anchorColor'><strong>Remove</strong></span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default CartRow;