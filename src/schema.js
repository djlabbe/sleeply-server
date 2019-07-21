const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    globalFeed: [LogEntry!]! # Display all log entries globally
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addEntry(note: String!, childId: ID!): LogEntry!
    addChild(name: String!): Child
  }

  type User {
    id: ID!
    name: String!
    email: String!
    children: [Child!]!
  }

  type Child {
    id: ID!
    name: String!
    parent: User!
    logEntries: [LogEntry!]!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type LogEntry {
    id: ID!
    note: String!
    createdBy: User!
    createdAt: String!
  }
`;

module.exports = typeDefs;
