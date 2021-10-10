import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
const Categories = ({ items, currentItem = 0 }) => {
  const [currentCategoryId, setCurrentCategoryId] = useState(currentItem);
  const onCategoryClick = (event) => {
    setCurrentCategoryId(event.target.id);
  };
  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((name, index) => {
            let isActive;
            if (index === +currentCategoryId) {
              isActive = true;
            }
            return (
              <li
                onClick={onCategoryClick}
                key={name + '_' + index}
                id={index}
                className={classNames({ active: isActive })}>
                {name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Categories;
