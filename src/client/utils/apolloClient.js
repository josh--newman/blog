import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { getCookie } from './cookies.js';
const networkInterface = createNetworkInterface({ uri: '/graphql' });

const applyMiddleware = (req, next) => {
  if (!req.options.headers) {
    req.options.headers = {};
  }
  req.options.headers.authorization = `Bearer ${getCookie('jwt')}`;
  next();
}

networkInterface.use([{applyMiddleware}])

export default new ApolloClient({
  networkInterface
});
