import React from 'react';
import App from 'next/app';
import {ApolloProvider} from '@apollo/react-hooks';
import Page from '../components/Page';
import withApollo from '../lib/with-apollo-client';

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return {pageProps};
  }

  render() {
    const {Component, pageProps, apolloClient} = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
