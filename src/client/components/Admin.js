import React from 'react';
import { Link } from 'react-router';
import { getUser } from '../utils/cookies';
import Sidebar from './SideBar';
import styles from './Admin.css';

const links = [
  <Link key='newPost' to='/admin/new'>Create post</Link>
]

class Admin extends React.Component {
  static propTypes = {
    // Provided by react router
    children: React.PropTypes.object
  }

  render() {
    return (
      <div className={styles.container}>
        <Sidebar user={getUser()} links={links} />
        <div className={styles.mainContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Admin;
