import React, { useEffect } from 'react';
import './cart.css';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../redux/slice/cart';

const Cart = () => {
  const dispatch= useDispatch();
  const cart = useSelector((state) => state.cart);
const handleRemoveFromCart=(cartItem)=>{
dispatch(removeFromCart(cartItem))
};
const handleDecreaseCart=(cartItem)=>{
dispatch(decreaseCart(cartItem))
};

const handleIncreaseCart = (cartItem)=>{
  dispatch(addToCart(cartItem))
};
const handleClearCart =()=>{
  dispatch(clearCart())
}
useEffect(()=>{
  dispatch(getTotals());
    },[cart,dispatch]);

  return (
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p>Your cart is currently empty</p>
          <div className='stat-shopping'>
            <Link to='/'>
              <ArrowBackIcon />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) :(
        <div>
          <div className='titles'>
            <h3 className='product-title'>Product</h3>
            <h3 className='price'>Price</h3>
            <h3 className='Quatity'>Quantity</h3>
            <h3 className='total'>Total</h3>
          </div>
          <div className='cart-items'>
            {cart.cartItems?.map((cartItem) => (
              <div className='cart-item' key={cartItem.id}>
                <div className='cart-product'>
                  <img src={cartItem.image} alt={cartItem.title} />
                  <div>
                    <h3>{cartItem.title}</h3>
                    <p>{cartItem.description.split(' ').slice(0, 6).join(' ')}...</p>
                    <button onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
                  </div>
                </div>
                <div className='cart-product-price'>${cartItem.rating.rate}</div>
                <div className='cart-product-quantity'>
                  <button onClick={()=> handleDecreaseCart(cartItem)}>-</button>
                  <div className='count'>{cartItem.cartQuantity}</div>
                  <button onClick={()=> handleIncreaseCart(cartItem)}>+</button>
                </div>
                <div className='cart-product-total-price'>
                  ${cartItem.rating.rate * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className='cart-summary'>
            <button className='clear-cart' onClick={()=> handleClearCart()}>Clear cart</button>
            <div className='cart-checkout'>
              <div className='subtotal'>
                <span>Subtotal</span>
                <span className='amount'>${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className='continue-shopping'>
                <Link to='/'>
                  <ArrowBackIcon />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
