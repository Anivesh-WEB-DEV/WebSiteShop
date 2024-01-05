
// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import logo from "../assets/Shop_Rite-removebg-preview.png";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import '../component/navbar.css';
// import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import { Link } from 'react-router-dom';
// import { useSelector,useDispatch } from 'react-redux';
// import { getTotals } from '../redux/slice/cart';
// const Navbar = () => {

//   const cart= useSelector(state=>state.cart)
//   const dispatch =useDispatch();
//   // Initialize AOS
//   useEffect(()=>{
//     dispatch(getTotals());
//   },[cart,dispatch])
//   AOS.init();

//   const StyledBadge = styled(Badge)(({ theme }) => ({
//     '& .MuiBadge-badge': {
//       right: -3,
//       top: 4,
//       border: `2px solid ${theme.palette.background.paper}`,
//       padding: '0 4px',
//     },
//   }));

//   return (
//     <div>
//       <div className="main">
//         <Link to='/'><div className="logi">
//           <img className='logo' src={logo} alt="" />
//         </div></Link>
//         <h1 data-aos="fade-down" data-aos-duration="2000">Welcome to Adarsh Store</h1>
//       <Link to="/Login" className='lognavbar'>
//       <div>Login</div>
//       </Link>
//        <Link to="/cart">
//        <StyledBadge className='cart' badgeContent={ cart.cartTotalQuantity} color="primary">
//           <ShoppingCartIcon className='cart2' />
//         </StyledBadge>
//        </Link>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



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
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Navbar = () => {

  const cart= useSelector(state=>state.cart)
  const dispatch =useDispatch();
  const { loginWithRedirect , logout , isAuthenticated , user } = useAuth0();
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
    
      <div className="main">
     <div className="main1">
     <Link to='/'><div className="logi">
          <img className='logo' src={logo} alt="" />
        </div></Link>
        <h1 data-aos="fade-down" data-aos-duration="2000">Welcome to Adarsh Store</h1>
     </div>

     <div className="main2">
     {
           isAuthenticated && (
           <div className="stack ">
             <Stack>
              <Avatar alt="Remy Sharp" src={user.picture}/>
              <p>{user.name}</p>
            </Stack>
           </div>
          )
        }
        
        
        {
          isAuthenticated ? (

           <button className='auth' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
           Log Out
         </button>
          ) : (

            <button className='auth' onClick={() => loginWithRedirect()}>Log In</button>
          )
        }
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
