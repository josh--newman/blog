import React from 'react';
import cx from 'classnames';
import styles from './SideBar.css';
import Gravatar from './Gravatar';
import CollapseButton from './Shared/CollapseButton';

class SideBar extends React.Component {
  state = { sidebarVisible: true }

  static defaultProps = {
    links: [],
    withBio: false
  }

  static propTypes = {
    links: React.PropTypes.array.isRequired,
    withBio: React.PropTypes.bool.isRequired,
    withCollapse: React.PropTypes.bool,
    user: React.PropTypes.object
  }

  onCollapse() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  }

  render() {
    const { links, withBio, withCollapse, user } = this.props;
    const { sidebarVisible } = this.state;

    const sidebarClassName = cx(styles.sidebar, {
      [styles.sidebarHidden]: !sidebarVisible
    });

    return (
      <aside className={sidebarClassName}>
        { withCollapse &&
          <CollapseButton
            onClick={this.onCollapse.bind(this)}
            open={this.state.sidebarVisible} />
        }
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
}

export default SideBar;
