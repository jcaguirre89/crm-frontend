function getHost(req) {
  if (!req) {
    console.log('in client')
    return 'http://localhost:8000';
  }


  const {host} = req.headers;

  if (process.env.NOD_ENV) {
    console.log('dev')
    return `http://localhost:8000`;
  }
  return `https://production.backend.tobedefined`;
}

export default getHost;
