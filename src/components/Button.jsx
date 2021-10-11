import React from 'react';

const Button = ({ className, children, ...otherProps }) => {
  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};

export default React.memo(Button);
