import { ApolloServer, gql } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import * as request from 'request-promise';

const typeDefs = gql`
  type Post {
    title: String
  }

  type Query {
    allPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    allPosts: () => request.get({ uri: 'https://jsonplaceholder.typicode.com/posts', json: true }),
  },
};

const createHandler = async () => {
  const server = new ApolloServer({ schema: buildFederatedSchema([{ typeDefs, resolvers }]) });
  return server.createHandler();
};

export default (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
