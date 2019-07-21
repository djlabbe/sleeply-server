const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
    logsForChild(childId: ID!): ChildLogs!
  }

  type ChildLogs {
    morningEntries: [MorningEntry!]!
    napEntries: [NapEntry!]!
    bedTimeEntries: [BedTimeEntry!]!
    nightWakingEntries: [NightWakingEntry!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addChild(name: String!): Child

    addMorningEntry(
      childId: ID!
      note: String!
      wakeUpTime: String!
      outOfBedTime: String!
    ): MorningEntry!

    addNapEntry(
      childId: ID!
      note: String!
      startTime: String!
      asleepTime: String!
      wakeUpTime: String!
    ): NapEntry!

    addBedTimeEntry(
      childId: ID!
      note: String!
      startTime: String!
      inBedTime: String!
      asleepTime: String!
    ): BedTimeEntry!

    addNightWakingEntry(
      childId: ID!
      note: String!
      wakeUpTime: String!
      asleepTime: String!
    ): NightWakingEntry!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    children: [Child!]!
    role: UserRoll!
  }

  enum UserRoll {
    ADMIN
    USER
  }

  type Child {
    id: ID!
    name: String!
    parent: User!
    morningEntries: [MorningEntry!]!
    napEntries: [NapEntry!]!
    bedTimeEntries: [BedTimeEntry!]!
    nightWakingEntries: [NightWakingEntry!]!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type MorningEntry {
    id: ID!
    wakeUpTime: String!
    outOfBedTime: String!
    note: String!
    createdBy: User!
    createdAt: String!
  }

  type NapEntry {
    id: ID!
    startTime: String!
    asleepTime: String!
    wakeUpTime: String!
    note: String!
    createdBy: User!
    createdAt: String!
  }

  type BedTimeEntry {
    id: ID!
    startTime: String!
    inBedTime: String!
    asleepTime: String!
    note: String!
    createdBy: User!
    createdAt: String!
  }

  type NightWakingEntry {
    id: ID!
    wakeUpTime: String!
    asleepTime: String!
    note: String!
    createdBy: User!
    createdAt: String!
  }
`;

module.exports = typeDefs;
