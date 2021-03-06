import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { validateUser } from '../utils/cookies';
import Home from './Home';
import Post from './Post';
import Admin from './Admin';
import SignIn from './SignIn';
import { PostList, EditPost } from './Posts';

const authAdmin = (nextState, replace) => {
  if (!validateUser()) {
    if (nextState.location.pathname !== '/signin') {
      return replace('/');
    }
  }
  else {
    if (nextState.location.pathname === '/signin') {
      // redirect to admin route because they're already authenticated
      return replace('/admin');
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} />
        <Route path='/signin' onEnter={authAdmin} component={SignIn} />
        <Route path='/post/:postId' component={Post} />
        <Route path='/admin' onEnter={authAdmin} component={Admin}>
          <IndexRoute component={PostList} />
          <Route path='new' component={EditPost} />
          <Route path='edit/:postId' component={EditPost} />
        </Route>
      </Router>
    );
  }
}

export default App;
