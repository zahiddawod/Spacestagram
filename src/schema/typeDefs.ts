import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getMostPopular(start: Int!, end: Int!): [Post]
  }
  type Post {
    id: String
    title: String
    url: String
    description: String
  }
`;
