import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import client from './utils/apolloClient';
import './styles.css'

import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
      <AppContainer>
        <ApolloProvider client={client}>
          <Component />
        </ApolloProvider>
      </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}
