import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav'


export default function Header() {
  // Display loading html on route changes
  useEffect(() => {
    Router.events.on('routeChangeStart', NProgress.start);
    Router.events.on('routeChangeComplete', NProgress.done);
    Router.events.on('routeChangeError', NProgress.done);

    return () => {
      Router.events.off('routeChangeStart', NProgress.start);
      Router.events.off('routeChangeComplete', NProgress.done);
      Router.events.off('routeChangeError', NProgress.done);
    };
  }, []);

  return (
    <Nav />
  );
}
