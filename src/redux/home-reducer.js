import { API } from './api';

const SET_PIZZAS = 'SET_PIZZAS';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_SORT = 'SET_SORT';
const ADD_PIZZA = 'ADD_PIZZA';
const CHANGE_COUNT = 'CHANGE_COUNT';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const CLEAR_CART = 'CLEAR_CART';

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
    case CLEAR_CART:
      return { ...state, cart: [] };
    case UPDATE_TOTAL:
      const totalCartItems = state.cart.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.count;
      }, 0);
      const totalPrice = state.cart.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.count * currentValue.product.price;
      }, 0);
      return { ...state, totalCartItems, totalPrice };
    case REMOVE_ITEM:
      if (state.cart.length && state.cart[payload.id]) {
        let arr = [...state.cart];
        arr.splice(payload.id, 1);
        return { ...state, cart: arr };
      }
      return state;
    case CHANGE_COUNT:
      if (state.cart.length && state.cart[payload.id]) {
        if (payload.number < 0) {
          if (state.cart[payload.id].count <= 1) {
            return state;
          }
        }
        let arr = [...state.cart];
        let el = {
          ...state.cart[payload.id],
          count: state.cart[payload.id].count + payload.number,
        };
        arr[payload.id] = el;
        return { ...state, cart: arr };
      }
      return state;
    case ADD_PIZZA:
      for (let index = 0; index < state.cart.length; index++) {
        const element = state.cart[index];
        if (isEqual(element.product, payload.pizza.product)) {
          let obj = {
            ...state,
            cart: [
              ...[...state.cart].map((el) => {
                if (isEqual(el.product, state.cart[index].product)) {
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
        cart: [
          ...state.cart,
          {
            count: 1,
            product: {
              id: payload.pizza.product.id,
              type: payload.pizza.product.type,
              size: payload.pizza.product.size,
              name: payload.pizza.product.name,
              img: payload.pizza.product.img,
              price: payload.pizza.product.price,
            },
          },
        ],
      };
      return obj;
    default:
      return state;
  }
};

// Action creators
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
      pizza: {
        count: count,
        product: {
          id,
          type: currentType,
          size: currentSize,
          name,
          img,
          price,
        },
      },
    },
  };
};
export const changeCount = (id, number) => {
  return { type: CHANGE_COUNT, payload: { id, number } };
};
export const removeItem = (id) => {
  return { type: REMOVE_ITEM, payload: { id } };
};
export const clearCart = () => {
  return { type: CLEAR_CART };
};

// Thunks
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
