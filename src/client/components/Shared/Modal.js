import React from 'react';
import ReactModal from 'react-modal';
import Button from './Button';
import styles from './Modal.css';

class Modal extends React.Component {
  state = { open: false, }

  static propTypes = {
    children: React.PropTypes.shape({
      props: React.PropTypes.shape({
        onClick: React.PropTypes.func.isRequired
      })
    }),
    action: React.PropTypes.string.isRequired
  }

  onChildClick() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  onCancel() {
    this.closeModal();
  }

  onActionClick() {
    const { props: childProps } = this.props.children;
    this.closeModal();
    childProps.onClick();
  }

  render() {
    const { children, action } = this.props;

    return (
      <div>
        {React.cloneElement(children, { onClick: this.onChildClick.bind(this) })}
        <ReactModal
          className={styles.content}
          overlayClassName={styles.overlay}
          isOpen={this.state.open}
          onRequestClose={this.onCancel.bind(this)}
        contentLabel='Confirm action'
        >
          <div className={styles.innerContent}>
            <p>{`Are you sure you want to ${action}?`}</p>
            <Button primary onClick={this.onActionClick.bind(this)}>Yes</Button>
            <Button secondary onClick={this.onCancel.bind(this)}>Cancel</Button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
