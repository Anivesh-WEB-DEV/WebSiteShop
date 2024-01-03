
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from "../assets/Shop_Rite-removebg-preview.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../component/navbar.css';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getTotals } from '../redux/slice/cart';
const Navbar = () => {

  const cart= useSelector(state=>state.cart)
  const dispatch =useDispatch();
  // Initialize AOS
  useEffect(()=>{
    dispatch(getTotals());
  },[cart,dispatch])
  AOS.init();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 4,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <div>
      <div className="main">
        <Link to='/'><div className="logi">
          <img className='logo' src={logo} alt="" />
        </div></Link>
        <h1 data-aos="fade-down" data-aos-duration="2000">Welcome to Adarsh Store</h1>
      <Link to="/Login" className='lognavbar'>
      <div>Login</div>
      </Link>
       <Link to="/cart">
       <StyledBadge className='cart' badgeContent={ cart.cartTotalQuantity} color="primary">
          <ShoppingCartIcon className='cart2' />
        </StyledBadge>
       </Link>
      </div>
    </div>
  );
}

export default Navbar;