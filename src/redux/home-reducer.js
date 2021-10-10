import { API } from './api';

const SET_PIZZAS = 'SET_PIZZAS';

const initialState = {
  pizzas: [],
  defaultSizes: [26, 30, 40],
  defaultTypes: [0, 1],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PIZZAS:
      return { ...state, pizzas: payload.pizzas };

    default:
      return state;
  }
};

export const setPizzasInState = (pizzas) => {
  return { type: SET_PIZZAS, payload: { pizzas } };
};

export const setPizzas = () => {
  return async (dispatch) => {
    const response = await API.getPizzas();
    dispatch(setPizzasInState(response.pizzas));
  };
};
