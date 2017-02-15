import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './SignIn.css';
import { Gravatar } from './Shared';
import { Loading } from './Shared';

const authenticate = gql`
  mutation authenticate($email: String!, $password: String!) {
    generateToken(email: $email, password: $password)
  }
`;

class SignIn extends React.Component {
  state = { email: '', password: '', loading: false };

  static propTypes = {
    // Provided by react router
    router: React.PropTypes.object,
    // Provided by apollo client
    mutate: React.PropTypes.func
  }

  authenticate() {
    const { email, password } = this.state;
    const variables = { email, password };

    this.setState({ loading: true });
    this.props.mutate({ variables })
      .then(res => {
        const jwt = res.data.generateToken;
        document.cookie = `jwt=${jwt};path=/`
        this.setState({ loading: false });
        this.props.router.push('/admin');
      }, err => {
        this.setState({ error: err.message, loading: false });
      });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { email, password, loading, error } = this.state;
    return (
      <div>
        { loading ? <Loading /> :
        <section className={styles.container}>
          <Gravatar />
          <h1>Sign in</h1>
          { error && <p className={styles.error}>{error}</p> }
          <input
            name="email"
            className={styles.input}
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.onChange.bind(this)}
          />
          <input
            name="password"
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange.bind(this)}
          />
          <button className={styles.button} onClick={this.authenticate.bind(this)}>
            Go
          </button>
        </section>
      }
    </div>
    );
  }
}

export default graphql(authenticate)(SignIn);
