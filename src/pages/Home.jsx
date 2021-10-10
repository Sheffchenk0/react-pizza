import React from 'react';
import Categories from '../components/Categories';
import PizzaItem from '../components/PizzaItem';
import Sort from '../components/Sort';
const Home = ({
  pizzas,
  defaultSizes,
  defaultTypes,
  sort,
  categories,
  currentCategoryId,
  setCategory,
}) => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categories} setCategory={setCategory} />
        <Sort list={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas &&
          pizzas.map((pizza) => {
            if (+pizza.category === +currentCategoryId || +currentCategoryId === -1) {
              return (
                <PizzaItem
                  name={pizza.name}
                  img={pizza.imageUrl}
                  price={pizza.price}
                  rating={pizza.rating}
                  sizes={pizza.sizes}
                  defaultSizes={defaultSizes}
                  defaultTypes={defaultTypes}
                  types={pizza.types}
                  key={pizza.id}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Home;
