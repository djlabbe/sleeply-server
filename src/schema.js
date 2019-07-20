const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    globalFeed: [LogEntry!]! # Display all log entries globally
    # userFeed: [LogEntry!]! # Display all log entries for all of user's children
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addEntry(note: String!): LogEntry!
    addChild(name: String!): Child
  }

  type User {
    id: ID!
    name: String!
    email: String!
    children: [Child!]!
    logEntries: [LogEntry!]!
  }

  type Child {
    id: ID!
    name: String!
    parent: User!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type LogEntry {
    id: ID!
    note: String!
    createdBy: User!
  }
`;

module.exports = typeDefs;
