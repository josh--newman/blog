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

const dataIdFromObject = (result) => {
  if (result.id && result.__typename) {
    return `${result.__typename}${result.id}`
  }

  return null;
}

export default new ApolloClient({
  networkInterface,
  dataIdFromObject
});
