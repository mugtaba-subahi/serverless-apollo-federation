import { gql } from 'apollo-server-lambda';

export default gql`
  type Post {
    title: String
  }

  type Query {
    # allPosts: [Post]
    allPosts: String
  }
`;
