import React from 'react';
import cx from 'classnames';
import styles from './Button.css';

const Button = ({ children, style, primary, secondary }) => {
  const buttonStyles = cx(style, styles.button, {
    [styles.primary]: !style && primary,
    [styles.secondary]: !style && secondary
  });
  return <button className={buttonStyles}>{children}</button>
}

Button.propTypes = {
  children: React.PropTypes.any,
  style: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  primary: React.PropTypes.bool.isRequired,
  secondary: React.PropTypes.bool.isRequired
}

Button.defaultProps = {
  primary: true,
  secondary: false
}

export default Button;
