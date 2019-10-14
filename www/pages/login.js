import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
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

    const { username, password } = userData;
    const url = `${props.apiUrl}/api-token-auth/`;

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
        console.log(responseData);
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
    <>
      <div className="login">
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
      </div>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form {
          display: flex;
          flex-flow: column;
        }
        label {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      `}</style>
    </>
  );
}

Login.getInitialProps = async ({ req }) => {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:8000`
      : `https://${req.headers.host}`;

  return { apiUrl };
};

export default Login;
