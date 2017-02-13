import React from 'react';
import styles from './SideBar.css';
import Gravatar from './Gravatar';

const SideBar = ({ links, withBio, user }) => {
  return (
    <aside className={styles.sidebar}>
      <Gravatar />
      { user && <h3>Hey, {user.firstName}.</h3> }
      { withBio &&
        <div>
          <div className={styles.about}>
            <h2>jn.</h2>
            <p>I'm a software engineer and maker. I share thoughts, guides and builds here.</p>
          </div>
          <hr/>
        </div>
      }
      <nav className={styles.nav}>
        <ul>
          {links.map((link, i) => (<li key={link.key}>{link}</li>))}
        </ul>
      </nav>
    </aside>
  );
}

SideBar.defaultProps = {
  links: [],
  withBio: false
}

SideBar.propTypes = {
  links: React.PropTypes.array.isRequired,
  withBio: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object
}

export default SideBar;
