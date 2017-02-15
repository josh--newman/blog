import React from 'react';
import { Link } from 'react-router';
import { getUser, logout } from '../utils/cookies';
import { SideBar } from './Shared';
import styles from './Admin.css';

const links = [
  <Link key='newPost' to='/admin/new'>Create post</Link>,
  <a key='logout' href='/' onClick={logout.bind(this)}>Log out</a>
]

class Admin extends React.Component {
  static propTypes = {
    // Provided by react router
    children: React.PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <SideBar withCollapse user={getUser()} links={links} />
        <div className={styles.mainContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Admin;
