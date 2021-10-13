import PropTypes from 'prop-types';
import React from 'react';
import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaItem';
import Sort from '../components/Sort';

const getSort = (a, b, sortType) => {
  switch (sortType) {
    case 0:
      return a.rating - b.rating;
    case 1:
      return a.price - b.price;
    case 2:
      return b.price - a.price;
    default:
      throw Error('uncorret sort id' + sortType);
  }
};

const Home = ({
  pizzas,
  defaultSizes,
  defaultTypes,
  sort,
  categories,
  currentCategoryId,
  setCategory,
  sortType,
  setSort,
  addPizza,
  cart,
}) => {
  let elements;
  if (pizzas.length) {
    elements = pizzas.map((pizza) => {
      let count = 0;
      if (+pizza.category === +currentCategoryId || +currentCategoryId === -1) {
        if (cart.length) {
          let obj = cart.find((el) => {
            if (el.id === pizza.id) {
              return true;
            }
          });
          count = obj && obj.count;
        }
      }
      return (
        <PizzaItem
          id={pizza.id}
          category={pizza.category}
          name={pizza.name}
          img={pizza.imageUrl}
          price={pizza.price}
          rating={pizza.rating}
          sizes={pizza.sizes}
          defaultSizes={defaultSizes}
          defaultTypes={defaultTypes}
          types={pizza.types}
          addPizza={addPizza}
          count={count}
          key={pizza.id}
        />
      );
    });
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          currentCategoryId={currentCategoryId}
          items={categories}
          setCategory={setCategory}
        />
        <Sort list={sort} sortType={sortType} onClick={setSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {elements &&
          elements
            .filter((el) => {
              if (el.props.category === currentCategoryId || currentCategoryId === -1) {
                return true;
              }
            })
            .sort((a, b) => getSort(a.props, b.props, sortType))}
      </div>
    </div>
  );
};

Home.propTypes = {
  addPizza: PropTypes.func,
  categories: PropTypes.array,
  currentCategoryId: PropTypes.number,
  defaultSizes: PropTypes.array,
  defaultTypes: PropTypes.array,
  pizzas: PropTypes.array,
  setCategory: PropTypes.func,
  setSort: PropTypes.func,
  sort: PropTypes.array,
  sortType: PropTypes.number,
};

export default Home;
