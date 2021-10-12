import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Header from './components/Header';
import { connect, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const HomeContainer = React.lazy(() => import('./pages/HomeContainer'));
const Page404 = React.lazy(() => import('./pages/Page404'));
const Cart = React.lazy(() => import('./pages/CartContainer'));

function App(props) {
  const state = useSelector((state) => ({
    cart: state.home.cart,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'UPDATE_TOTAL' });
  }, [state.cart]);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" render={() => <HomeContainer />} />
            <Route path="/cart" render={() => <Cart />} />
            <Route path="*" render={() => <Page404 />} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
export default App;
