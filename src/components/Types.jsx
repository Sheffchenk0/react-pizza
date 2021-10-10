import React from 'react';
import classNames from 'classnames';

const Types = ({ types, onClick, active, defaultTypes, currentType }) => {
  const names = ['традиционное', 'тонкое'];
  return (
    <ul>
      {defaultTypes &&
        defaultTypes.map((type, index) => {
          return (
            <li
              onClick={() => {
                onClick(type, types.includes(type));
              }}
              key={type}
              disabled={!types.includes(type)}
              className={classNames({
                active: currentType === type,
                'pizza-block__disabled': !types.includes(type),
              })}>
              {names[type]}
            </li>
          );
        })}
    </ul>
  );
};

export default Types;
