import { API } from './api';

const SET_PIZZAS = 'SET_PIZZAS';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_SORT = 'SET_SORT';
const ADD_PIZZA = 'ADD_PIZZA';

const initialState = {
  pizzas: [],
  defaultSizes: [26, 30, 40],
  defaultTypes: [0, 1],
  categories: ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Сладкие', 'Разное'],
  currentCategoryId: -1,
  sort: ['популярности', 'дешевле', 'дороже'],
  sortType: 2,
  cart: [],
  totalPrice: 0,
  totalCartItems: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PIZZAS:
      return { ...state, pizzas: payload.pizzas };
    case SET_CATEGORY:
      return { ...state, currentCategoryId: payload.currentCategoryId };
    case SET_SORT:
      return { ...state, sortType: payload.sortType };
    case ADD_PIZZA:
      let cPizza = state.pizzas.find((pizza) => pizza.id === payload.pizza.id) || { price: 0 };
      let price = cPizza.price;
      for (let index = 0; index < state.cart.length; index++) {
        const element = state.cart[index];
        console.log(element, payload.pizza);
        if (isEqual(element, payload.pizza)) {
          let obj = {
            ...state,
            totalPrice: state.totalPrice + price,
            totalCartItems: state.totalCartItems + 1,
            cart: [
              ...[...state.cart].map((el) => {
                if (+el.id === +state.cart[index].id) {
                  return {
                    ...element,
                    count: element.count + 1,
                  };
                }
                return el;
              }),
            ],
          };
          return obj;
        }
      }
      let obj = {
        ...state,
        totalPrice: state.totalPrice + price,
        totalCartItems: state.totalCartItems + 1,
        cart: [
          ...state.cart,
          {
            id: payload.pizza.id,
            type: payload.pizza.type,
            size: payload.pizza.size,
            name: payload.pizza.name,
            img: payload.pizza.img,
            price: payload.pizza.price,
            count: 1,
          },
        ],
      };
      return obj;
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
export const setSort = (sortType) => {
  return { type: SET_SORT, payload: { sortType } };
};
export const addPizza = (id, currentType, currentSize, count = 0, name, img, price) => {
  return {
    type: ADD_PIZZA,
    payload: {
      pizza: { id, type: currentType, size: currentSize, name, img, price, count: count },
    },
  };
};
export const setPizzas = () => {
  return async (dispatch) => {
    const response = await API.getPizzas();
    dispatch(setPizzasInState(response.pizzas));
  };
};
function isEqual(object1, object2) {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i];
    const bothAreObjects = typeof object1[prop] === 'object' && typeof object2[prop] === 'object';

    if (
      (!bothAreObjects && object1[prop] !== object2[prop]) ||
      (bothAreObjects && !isEqual(object1[prop], object2[prop]))
    ) {
      return false;
    }
  }

  return true;
}

export default reducer;
