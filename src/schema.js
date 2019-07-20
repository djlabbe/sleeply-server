const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    globalFeed: [LogEntry!]! # Display all log entries globally
    userFeed: [LogEntry!]! # Display all log entries for all of user's children
  }

  type Mutation {
    addEntry(note: String!): LogEntry!
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type User {
    id: ID!
    name: String!
    email: String!
    logEntries: [LogEntry!]!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type LogEntry {
    id: ID!
    note: String!
    createdBy: User
  }
`;

module.exports = typeDefs;
