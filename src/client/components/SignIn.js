import React from 'react';
import styles from './SignIn.css';
import Gravatar from './Gravatar';

class SignIn extends React.Component {
  render() {
    return (
      <section className={styles.container}>
        <Gravatar />
        <h1>Sign in</h1>
        <input className={styles.input} type="text" placeholder="Email"/>
        <input className={styles.input} type="password" placeholder="Password"/>
        <button className={styles.button} onClick={() => {}}>
          Go
        </button>
      </section>
    );
  }
}

export default SignIn;
