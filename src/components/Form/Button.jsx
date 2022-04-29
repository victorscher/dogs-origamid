import React from 'react';
import Classes from './Button.module.scss';

function Button({ children, ...props }) {
  return (
    <button className={Classes.button} type="submit" {...props}>{children}</button>
  );
}

export default Button;
