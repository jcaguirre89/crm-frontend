import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { login } from '../utils/auth';

function Login(props) {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData({
      ...userData,
      error: '',
    });

    const url = `${props.apiUrl}/api-token-auth/`;
    const { username, password } = userData;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cors: 'cors',
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        const { token } = responseData;
        await login({ token });
      } else {
        console.log('Login failed.');
        const responseData = await response.json();
        // https://github.com/developit/unfetch#caveats
        const error = new Error(JSON.stringify(responseData));
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      const { response, message } = error;
      setUserData({
        ...userData,
        error: message || response.statusText,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={userData.username}
        onChange={event =>
          setUserData({
            ...userData,
            username: event.target.value,
          })
        }
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={userData.password}
        onChange={event =>
          setUserData({
            ...userData,
            password: event.target.value,
          })
        }
      />

      <button type="submit">Login</button>

      {userData.error && <p className="error">Error: {userData.error}</p>}
    </form>
  );
}

export default Login;
