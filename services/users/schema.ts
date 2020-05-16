import { gql } from 'apollo-server-lambda';

export default gql`
  type User {
    id: Int
  }

  type Query {
    # allUsers: [User]
    allUsers: String
  }
`;
