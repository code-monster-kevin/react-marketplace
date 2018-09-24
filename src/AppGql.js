import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_APOLLO_URI,
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

class AppGql extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <App handleChangeLocale={this.props.handleChangeLocale} />
      </ApolloProvider>
    );
  }
}

export default AppGql;
