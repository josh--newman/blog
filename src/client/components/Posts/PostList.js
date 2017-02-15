import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Loading } from '../Shared';
import DetailedPostPreview from './DetailedPostPreview';
import PostPreview from './PostPreview';

const PostsQuery = gql`{
  posts {
    id
    title
    content
    views,
    published,
    createdAt,
    updatedAt
  }
}
`;

class PostList extends React.Component {
  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      posts: React.PropTypes.array
    }),
    adminView: React.PropTypes.bool.isRequired
  }

  static defaultProps = {
    adminView: false
  }

  renderPosts(posts) {
    const { adminView } = this.props;
    if (!posts) { return null; }

    if (adminView) {
      return posts.map(post => (
        <DetailedPostPreview key={post.id} {...post} />
      ));
    }
    else {
      return posts.map(post => (
        <PostPreview key={post.id} {...post} />
      ));
    }
  }

  render() {
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
