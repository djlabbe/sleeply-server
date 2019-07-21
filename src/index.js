const { ApolloServer } = require('apollo-server');
const { prisma } = require('../prisma/generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Child = require('./resolvers/Child');
const MorningEntry = require('./resolvers/MorningEntry');
const NapEntry = require('./resolvers/NapEntry');
const BedTimeEntry = require('./resolvers/BedTimeEntry');
const NightWakingEntry = require('./resolvers/NightWakingEntry');

const resolvers = {
  Query,
  Mutation,
  User,
  Child,
  MorningEntry,
  NapEntry,
  BedTimeEntry,
  NightWakingEntry
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
