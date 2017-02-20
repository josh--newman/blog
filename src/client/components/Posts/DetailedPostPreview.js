import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { decorate } from 'value-pipeline';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './DetailedPostPreview.css';
import { Button, Modal } from '../Shared';

const deletePost = gql`
  mutation deletePost($postId: ID!) {
    deletePost(id: $postId) { id }
  }
`;

const publishPost = gql`
  mutation publishPost($postId: ID!, $publish: Boolean) {
    publishPost(id: $postId, publish: $publish) { id, published }
  }
`;

class DetailedPostPreview extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    published: React.PropTypes.bool.isRequired,
    createdAt: React.PropTypes.string.isRequired,
    updatedAt: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired,
    deletePost: React.PropTypes.func.isRequired,
    publishPost: React.PropTypes.func.isRequired
  }

  render() {
    const {
      id,
      title,
      content,
      published,
      createdAt,
      updatedAt,
      views,
      deletePost,
      publishPost
    } = this.props;


    const publishedStatus = cx({
      [styles.published]: !published,
      [styles.unpublished]: published
    });

    const viewsText = `${views} view${views === 0 || views > 1 ? 's' : ''}`;
    const publishText = published ? 'unpublish' : 'publish';

    return (
      <div className={styles.container}>
        <h1>{title}</h1>
        <p>{content}</p>
        <div className={styles.detailsBox}>
          <span className={styles.detail}>{viewsText}</span>
          <span className={styles.detail}>Created {moment(new Date(createdAt)).fromNow()}</span>
          <span className={styles.detail}>Updated {moment(new Date(updatedAt)).fromNow()}</span>
        </div>
        <div className={styles.actionsBox}>
          <div className={styles.buttonContainer}>
              <Button primary onClick={() => {console.log('editing')}}>Edit</Button>
          </div>
          <div className={styles.buttonContainer}>
            <Modal action='delete'>
              <Button secondary onClick={deletePost.bind(this, id)}>Delete</Button>
            </Modal>
          </div>
          <div className={styles.buttonContainer}>
            <Modal action={publishText}>
              <Button
                onClick={publishPost.bind(this, id, !published)}
                style={publishedStatus}
              >
                { published ? 'Unpublish' : 'Publish' }
              </Button>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

const withDeletePost = graphql(deletePost, {
  name: 'deletePostMutation',
  props: ({ deletePostMutation }) => ({
    deletePost: (postId) => deletePostMutation({
      variables: { postId },
      updateQueries: {
        PostList: (prev, {mutationResult}) => {
          const deletedPost = mutationResult.data.deletePost.id;
          const newPosts = prev.posts.filter(p => p.id !== deletedPost);
          return { ...prev, posts: newPosts };
        }
      }
    })
  })
});

const withPublishPost = graphql(publishPost, {
  name: 'publishPostMutation',
  props: ({ publishPostMutation }) => ({
    publishPost: (postId, publish) => publishPostMutation({
      variables: { postId, publish }
    })
  })
});

export default decorate(
  withDeletePost,
  withPublishPost,
  DetailedPostPreview
);
