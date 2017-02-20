import React from 'react';
import marked from 'marked';
import Editor from 'react-codemirror';
import '!style-loader!css-loader!codemirror/lib/codemirror.css';
import '!style-loader!css-loader!codemirror/theme/3024-day.css';
import 'codemirror/mode/markdown/markdown';
import styles from './MarkdownEditor.css';

const options = {
  lineNumbers: true,
  mode: 'markdown',
  lineWrapping: true,
  theme: '3024-day'
};

class MarkdownEditor extends React.Component {
  static propTypes = {
    code: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  }

  render() {
    const { code, onChange } = this.props;
    const preview = marked(code);

    return (
      <div className={styles.container}>
        <div className={styles.editor}>
          <Editor value={code} options={options} onChange={onChange} />
        </div>
        <div className={styles.previewContainer}>
          <span>Preview</span>
          <div className={styles.preview} dangerouslySetInnerHTML={{__html: preview}} />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
