import React from 'react';
import classNames from 'classnames';

const Sizes = ({ sizes, defaultSizes, onClick, currentSize }) => {
  return (
    <ul>
      {defaultSizes &&
        defaultSizes.map((size) => {
          return (
            <li
              onClick={() => {
                onClick(size, sizes.includes(size));
              }}
              key={size}
              disabled={!sizes.includes(size)}
              className={classNames({
                active: currentSize === size,
                'pizza-block__disabled': !sizes.includes(size),
              })}>
              {size}
            </li>
          );
        })}
    </ul>
  );
};

export default Sizes;
