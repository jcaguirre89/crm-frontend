const path = require('path');
const {importSchema} = require('graphql-import');
const {ApolloServer, gql} = require('apollo-server');
const {DjangoAPI} = require('./datasource');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
require('dotenv').config();

const typeDefs = importSchema(path.resolve('schema.graphql'));

const resolvers = {
  Query,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  dataSources: () => {
    return {
      djangoAPI: new DjangoAPI(),
    };
  },
  context: ({req}) => {
    // Add token coming from Apollo Client so RestDataSource can pass it to Django
    const token = req.headers.authorization || '';
    return {
      token,
      env: process.env.ENVIRONMENT,
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
