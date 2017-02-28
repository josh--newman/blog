import React from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { decorate } from 'value-pipeline';

import Editor from './MarkdownEditor';
import { Loading, Button } from '../Shared';
import styles from './Edit.css';

const getPost = gql`
  query getPost($postId: ID!) {
    postById(id: $postId) {
      title,
      content
    }
  }
`;

const createPost = gql`
mutation createPost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id,
    title,
    content
  }
}
`;

const updatePost = gql`
  mutation updatePost($postId: ID!, $title: String, $content: String) {
    updatePost(id: $postId, title: $title, content: $content) {
      id,
      title,
      content
    }
  }
`;

class EditPost extends React.Component {
  state = {title: '', code: ''};

  static propTypes = {
    createPost: React.PropTypes.func.isRequired,
    updatePost: React.PropTypes.func.isRequired,
    // Provided by react-router
    params: React.PropTypes.shape({
      postId: React.PropTypes.string
    }),
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired
    }),
    // Provided by apollo-client
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      data: React.PropTypes.object
    })
  }

  componentWillReceiveProps(nextProps) {
    const post = nextProps.data.postById;
    if (post) {
      this.setState({ title: post.title, code: post.content });
    }
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onCodeChange(code) {
    this.setState({ code });
  }

  onSave() {
    const { postId } = this.props.params;
    const { createPost, updatePost } = this.props;
    const { title, code: content } = this.state;

    // If there's a postId, update the post
    // otherwise create a new one
    if (postId) { updatePost(postId, title, content); }
    else { createPost(title, content); }

    // Go back to post list
    this.props.router.push('/admin');
  }

  render() {
    const { postId } = this.props.params;
    const buttonLabel = postId ? 'Save' : 'Create';

    if (this.props.data && this.props.data.loading) {
      return <Loading />;
    }

    return (
      <div>
        <div className={styles.titleInput}>
          <input
            type='text'
            placeholder='Title'
            value={this.state.title}
            onChange={this.onTitleChange.bind(this)}
          />
          <Button onClick={this.onSave.bind(this)} style={styles.saveButton}>
            {buttonLabel}
          </Button>
        </div>
        <Editor code={this.state.code} onChange={this.onCodeChange.bind(this)} />
      </div>
    );
  }
}

const withGetPost = graphql(getPost, {
  skip: (ownProps) => !ownProps.params.postId,
  options: (ownProps) => {
    const { postId } = ownProps.params;
    return { variables: {postId}, forceFetch: true };
  }
});

const withCreatePost = graphql(createPost, {
  name: 'createPostMutation',
  props: ({ createPostMutation }) => ({
    createPost: (title, content) => createPostMutation({
      variables: { title, content }
    })
  })
});

const withUpdatePost = graphql(updatePost, {
  name: 'updatePostMutation',
  props: ({ updatePostMutation }) => ({
    updatePost: (postId, title, content) => updatePostMutation({
      variables: { postId, title, content }
    })
  })
});

export default decorate(
  withGetPost,
  withCreatePost,
  withUpdatePost,
  withRouter,
  EditPost
);
