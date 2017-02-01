import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './App.css';
import Header from './Header';

const PostsQuery = gql`{
  posts {
    id
    title
    content
  }
}
`;

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default graphql(PostsQuery)(App);
