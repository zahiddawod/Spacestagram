import { gql } from "apollo-server-express";

export default gql`
  type Query {
    hello: String
    getMostPopular(start: Int!, end: Int!): [Post]
  }
  type Post {
    title: String
    url: String
    description: String
  }
`;
