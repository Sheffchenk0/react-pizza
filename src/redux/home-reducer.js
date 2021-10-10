import { API } from './api';

const SET_PIZZAS = 'SET_PIZZAS';
const SET_CATEGORY = 'SET_CATEGORY';

const initialState = {
  pizzas: [],
  defaultSizes: [26, 30, 40],
  defaultTypes: [0, 1],
  categories: ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'],
  currentCategoryId: -1,
  sort: ['популярности', 'дешевле', 'дороже'],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PIZZAS:
      return { ...state, pizzas: payload.pizzas };
    case SET_CATEGORY:
      return { ...state, currentCategory: payload.currentCategoryId };

    default:
      return state;
  }
};

export const setPizzasInState = (pizzas) => {
  return { type: SET_PIZZAS, payload: { pizzas } };
};

export const setCategory = (currentCategoryId) => {
  return { type: SET_CATEGORY, payload: { currentCategoryId } };
};

export const setPizzas = () => {
  return async (dispatch) => {
    const response = await API.getPizzas();
    dispatch(setPizzasInState(response.pizzas));
  };
};
