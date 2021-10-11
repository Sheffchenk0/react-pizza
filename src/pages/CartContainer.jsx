import React from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';
import CartEmpty from './CartEmpty';

export const CartContainer = ({ cart, ...otherProps }) => {
  console.log('dadwa');
  console.log(cart);
  if (!cart.length) {
    return <CartEmpty />;
  }
  return <Cart {...otherProps} cart={cart} />;
};

const mapStateToProps = (state) => ({
  cart: state.home.cart,
  totalPrice: state.home.totalPrice,
  totalCartItems: state.home.totalCartItems,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
