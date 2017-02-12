import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Home from './Home';
import Post from './Post';
import Admin from './Admin';
import SignIn from './SignIn';

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/signin' component={SignIn} />
        <Route path='/post/:postId' component={Post} />
        <Route path='/admin' component={Admin} />
      </Router>
    );
  }
}

export default App;
