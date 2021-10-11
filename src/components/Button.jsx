import React from 'react';
import classNames from 'classnames';

const Button = ({ className, children, ...otherProps }) => {
  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
