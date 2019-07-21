const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addChild(name: String!): Child

    addMorningEntry(
      childId: ID!
      date: String!
      note: String!
      wakeUpTime: String!
      outOfBedTime: String!
    ): LogEntry!

    addNapEntry(
      childId: ID!
      date: String!
      note: String!
      startTime: String!
      asleepTime: String!
      wakeUpTime: String!
    ): LogEntry!

    addBedTimeEntry(
      childId: ID!
      date: String!
      note: String!
      startTime: String!
      inBedTime: String!
      asleepTime: String!
    ): LogEntry!

    addNightEntry(
      childId: ID!
      date: String!
      note: String!
      wakeUpTime: String!
      asleepTime: String!
    ): LogEntry!
  }
  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    role: UserRole!
    name: String!
    email: String!
    children: [Child!]!
  }

  enum UserRole {
    ADMIN
    USER
  }

  type Child {
    id: ID!
    name: String!
    parent: User!
    logs(pageSize: Int, after: String): LogConnection!
  }

  type LogConnection {
    cursor: String!
    hasMore: Boolean!
    logEntries: [LogEntry!]!
  }

  type LogEntry {
    id: ID!
    date: String!
    createdBy: User!
    createdAt: String!
    child: Child!
    type: LogType!
    note: String!
    wakeUpTime: String
    outOfBedTime: String
    startTime: String
    asleepTime: String
    inBedTime: String
  }

  enum LogType {
    MORNING
    NAP
    BEDTIME
    NIGHT
  }
`;

module.exports = typeDefs;
