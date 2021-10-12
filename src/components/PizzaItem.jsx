import React, { useState } from 'react';
import Button from './Button';
import Sizes from './Sizes';
import Types from './Types';

const PizzaItem = ({
  count,
  name,
  img,
  types,
  sizes,
  price,
  rating,
  defaultSizes,
  defaultTypes,
  addPizza,
  id,
}) => {
  const [currentType, setCurrentType] = useState(types[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0]);
  const onChangeCurrentSize = (id, disabled) => {
    if (disabled) {
      setCurrentType(id);
    }
  };
  const onChangeCurrentType = (id, disabled) => {
    if (disabled) {
      setCurrentSize(id);
    }
  };
  const onAddToCart = () => {
    addPizza(id, currentType, currentSize, count, name, img, price);
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={img} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <Types
          currentType={currentType}
          active={currentType}
          types={types}
          onClick={onChangeCurrentSize}
          defaultTypes={defaultTypes}
        />
        <Sizes
          currentSize={currentSize}
          onClick={onChangeCurrentType}
          sizes={sizes}
          defaultSizes={defaultSizes}
        />
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <Button className="button button--outline button--add" onClick={onAddToCart}>
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
        </Button>
      </div>
    </div>
  );
};

export default PizzaItem;
