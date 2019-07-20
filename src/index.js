const { ApolloServer } = require('apollo-server');
const { prisma } = require('../prisma/generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const LogEntry = require('./resolvers/LogEntry');
const Child = require('./resolvers/Child');

const resolvers = {
  Query,
  Mutation,
  User,
  Child,
  LogEntry
};

const server = new ApolloServer({
  typeDefs: require('./schema'),
  resolvers,
  context: async request => {
    return {
      request,
      prisma
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
