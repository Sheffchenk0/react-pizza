import React, { useMemo } from 'react';
import classNames from 'classnames';
const Categories = ({ items, currentCategoryId, setCategory }) => {
  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((name, index) => {
            let isActive;
            if (index === +currentCategoryId + 1) {
              isActive = true;
            }
            return (
              <li
                onClick={() => {
                  setCategory(index - 1);
                }}
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

export default React.memo(Categories);
