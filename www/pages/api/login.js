import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  const {username, password} = await req.body;
  const data = JSON.stringify({username, password});
  console.log('username', username, password);
  const url = `http://localhost:8000/api-token-auth/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (response.ok) {
      const {token} = await response.json();
      return res.status(200).json({token});
    } else {
      // https://github.com/developit/unfetch#caveats
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    console.log('error');
    const {response} = error;
    return response
      ? res.status(response.status).json({message: response.statusText})
      : res.status(400).json({message: error.message});
  }
};
