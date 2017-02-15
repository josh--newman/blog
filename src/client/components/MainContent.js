import React from 'react';
import styles from './MainContent.css';
import { PostList } from './Posts';

class MainContent extends React.Component {
  render() {
    return (
      <div className={styles.mainContent}>
        <PostList />
      </div>
    );
  }
}

export default MainContent;
