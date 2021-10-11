import React, { useEffect } from 'react';
import { setPizzas, setSort, setCategory, addPizza } from '../redux/home-reducer';
import { connect } from 'react-redux';
import Home from './Home';

const HomeContainer = ({ setPizzas, ...otherProps }) => {
  useEffect(() => {
    setPizzas();
  }, [setPizzas]);
  return <Home {...otherProps} />;
};

const mapStateToProps = (state) => ({
  pizzas: state.home.pizzas,
  defaultSizes: state.home.defaultSizes,
  defaultTypes: state.home.defaultTypes,
  categories: state.home.categories,
  sort: state.home.sort,
  currentCategoryId: state.home.currentCategoryId,
  sortType: state.home.sortType,
  cart: state.home.cart,
});

const mapDispatchToProps = {
  setPizzas,
  setCategory,
  setSort,
  addPizza,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
