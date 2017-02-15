import React from 'react';
import styles from './Gravatar.css';

const Gravatar = () => {
  return (
    <div className={styles.logo}>
      <img src="https://www.gravatar.com/avatar/7498173568bea2faec3c6907e906628b"/>
    </div>
  );
}

export default Gravatar;
