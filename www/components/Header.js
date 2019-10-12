import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 900px) {
    margin: 0;
    text-align: center;
  }
`;

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
    <Logo>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Logo>
  );
}
