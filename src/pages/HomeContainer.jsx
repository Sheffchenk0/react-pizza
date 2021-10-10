import React, { useEffect } from 'react';
import { setPizzas } from '../redux/home-reducer';
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
});

const mapDispatchToProps = {
  setPizzas,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
