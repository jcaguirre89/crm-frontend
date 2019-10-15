import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:4000/api', // Server URL (must be absolute)
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // If in the server, dont try to read a cookie
  if (!process.browser) return '';
  const token = Cookies.get('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Token ${token}` : '',
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    credentials: 'include',
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
