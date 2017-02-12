import React from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PostsQuery = gql`{
  posts {
    id
    title
    content
  }
}
`;

const styles = {
  display: 'flex'
};

class App extends React.Component {
  render() {
    return (
      <div style={styles}>
        <SideBar />
        <MainContent />
      </div>
    );
  }
}

export default graphql(PostsQuery)(App);
