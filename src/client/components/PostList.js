import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from './Loading';
import PostPreview from './PostPreview';

const PostsQuery = gql`{
  posts {
    id
    title
    content
  }
}
`;

class PostList extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    posts: React.PropTypes.array
  }

  renderPosts(posts) {
    if (!posts) { return null; }

    return posts.map(post => {
      return <PostPreview key={post.id} {...post} />
    });
  }

  render() {
    console.log(this.props)
    const { loading, posts } = this.props.data;

    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        {this.renderPosts(posts)}
      </div>
    )
  }
}

export default graphql(PostsQuery)(PostList);
