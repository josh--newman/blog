import React from 'react';
import styles from './SideBar.css';
import Gravatar from './Gravatar';

class SideBar extends React.Component {
  static defaultProps = {
    links: [],
    withBio: true
  }

  static propTypes = {
    links: React.PropTypes.array.isRequired,
    withBio: React.PropTypes.bool.isRequired
  }

  renderLinks(links) {
    return (
      <ul>
        {links.map((link, i) => {
          return <li key={i}><a href={link.href}>{link.label}</a></li>
        })}
      </ul>
    );
  }

  render() {
    const { links, withBio } = this.props;
    return (
      <aside className={styles.sidebar}>
        <Gravatar />
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
          {this.renderLinks(links)}
        </nav>
      </aside>
    );
  }
}

export default SideBar;
