import React from 'react';
import styles from './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <nav>This is a nav</nav>
      </header>
    );
  }
}

export default Header;
