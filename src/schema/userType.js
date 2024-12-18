// src/schema/usuarioType.js

import { gql } from 'apollo-server-express';

const userType = gql`
  type user {
    user_id: ID!
    fullname: String
    email: String
  }

  type Query {
    users: [user]
    user(user_id: ID!): user
  }

  type Mutation {
    createUser(fullname: String!, email: String!): user
  }
`;

export default userType;
