const { ApolloServer } = require('apollo-server');
const { prisma } = require('../prisma/generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Child = require('./resolvers/Child');
const LogEntry = require('./resolvers/LogEntry');
const { tradeTokenForUser } = require('./services/authentication');

const resolvers = {
  Query,
  Mutation,
  User,
  Child,
  LogEntry
};

// Attach the prismaDB, some basic user info, and the request data
// to the context
const context = async request => {
  let authToken = request.req.get('Authorization') || '';
  const userId = tradeTokenForUser(authToken);

  const user = userId
    ? await prisma.user({ id: userId }).$fragment(`{ id role name email }`)
    : null;

  return {
    request,
    user,
    prisma
  };
};

const server = new ApolloServer({
  typeDefs: require('./schema'),
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
