import React from 'react';
import styles from './CollapseButton.css';

const CollapseButton = ({ open, onClick }) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <div className={open ? styles.line1Open : styles.line1Closed} />
      <div className={open ? styles.line2Open : styles.line2Closed} />
    </div>
  );
}

export default CollapseButton;
