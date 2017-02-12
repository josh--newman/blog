import React from 'react';
import styles from './SideBar.css';

class SideBar extends React.Component {
  render() {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="https://www.gravatar.com/avatar/7498173568bea2faec3c6907e906628b"/>
        </div>
        <div className={styles.about}>
          <h2>jn.</h2>
          <p>I'm a software engineer and maker. I share thoughts, guides and builds here.</p>
        </div>
        <hr/>
        <nav className={styles.nav}>
          <ul>
            <li><a href="#">About this blog</a></li>
            <li><a href="#">1PPM challenge</a></li>
            <li></li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default SideBar;
