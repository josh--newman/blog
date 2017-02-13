import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { getCookie } from './cookies.js';
const networkInterface = createNetworkInterface({ uri: '/graphql' });

const applyMiddleware = (req, next) => {
  if (!req.options.headers) {
    req.options.headers = {};
  }

  const jwt = getCookie('jwt');
  if (jwt) {
    req.options.headers.authorization = `Bearer ${jwt}`;
  }
  next();
}

networkInterface.use([{applyMiddleware}])

export default new ApolloClient({
  networkInterface
});
