import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { login } from '../utils/auth';
import Login from '../components/Login';

function LoginPage(props) {
  return <Login apiUrl={props.apiUrl} />;
}

LoginPage.getInitialProps = async ({ req }) => {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:8000`
      : `https://${req.headers.host}`;

  return { apiUrl };
};

export default LoginPage;
