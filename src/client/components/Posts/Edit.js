import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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

class EditPost extends React.Component {
  state = {title: '', code: ''};

  static propTypes = {
    // Provided by react-router
    params: React.PropTypes.shape({
      postId: React.PropTypes.string
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

  render() {
    const { postId } = this.props.params;
    const buttonLabel = postId ? 'Save' : 'Create';

    if (this.props.data.loading) {
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
          <Button style={styles.saveButton}>
            {buttonLabel}
          </Button>
        </div>
        <Editor code={this.state.code} onChange={this.onCodeChange.bind(this)} />
      </div>
    );
  }
}

export default graphql(getPost, {
  options: (ownProps) => {
    const { postId } = ownProps.params;
    return { variables: {postId} };
  }
})(EditPost);
