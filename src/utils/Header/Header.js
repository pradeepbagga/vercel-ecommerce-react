import React, { useEffect } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedin, userProfile, userLogout, logout } from '../../redux/authSlice/signin';

const checkLoggedIn = () => {
  let token = document.cookie;
  if (token.indexOf("token") !== -1) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
  else {
    return null;
  }
}

const checkTokenExpire = () => {
  let token = document.cookie;
  if ((token.indexOf("token") !== -1) && (localStorage.getItem("appToken"))) {
    return true;
  }
  else if ((token.indexOf("token") === -1) && (localStorage.getItem("appToken"))) {
    return false;
  }
  // else {
  //   return false;
  // }
}

const Header = () => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector(state => state.cart);
  const { userLoggedIn } = useSelector(state => state.user);
  let location = useLocation();

  const handleLogout = () => {
    dispatch(logout())
  }

  const menu = [
    {
      path: '/signin',
      text: 'Sign in'
    },
    {
      path: '/signup',
      text: 'Sign up'
    },
  ];

  const menuLoggedin = [
    {
      path: '/profile',
      text: 'Profile'
    }
  ];

  useEffect(() => {
    const user = checkLoggedIn();
    if (user) {
      dispatch(isLoggedin(user))
    }
  }, []);

  useEffect(() => {
    // checkLoggedIn(); 
    if (userLoggedIn) {
      const userLS = localStorage.getItem("user");
      if (userLS === undefined || userLS === null) {
        const token = localStorage.getItem("appToken");
        dispatch(userProfile(token));
      }
    }

    let tokenExpire = checkTokenExpire();
    if (tokenExpire === false) {
      dispatch(userLogout());
    }

  }, [location.pathname, userLoggedIn, dispatch]);

  return (
    <div className='header-container'>
      <h2><Link to="/">MERN E-Commerce</Link></h2>
      <nav>
        {
          userLoggedIn ? (<>
            {
              menuLoggedin.map((item, index) => {
                return <Link to={item.path} key={index}>{item.text}</Link>
              })
            }
            <span className='logout' onClick={() => handleLogout()}>Logout</span>
          </>) : (<>
            {
              menu.map((item, index) => {
                return <Link to={item.path} key={index}>{item.text}</Link>
              })
            }
          </>)

        }
        <Link to="/cart"><span>{cartProducts.length}&nbsp;<ShoppingCartIcon /></span></Link>
        {/* <Link to="/create-product">Create Product</Link> */}
      </nav>
    </div>
  )
}

export default Header