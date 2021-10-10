import React from 'react';
import classNames from 'classnames';

const Button = ({ className, children, ...otherProps }) => {
  return <button className={className}>{children}</button>;
};

export default Button;
