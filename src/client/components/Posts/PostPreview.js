import React from 'react';

class PostPreview extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default PostPreview;
