import { ApolloServer } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloGateway } from '@apollo/gateway';

const createHandler = async () => {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'posts', url: 'http://localhost:3000/dev/posts' },
      { name: 'users', url: 'http://localhost:3000/dev/users' },
    ],
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
  });

  return server.createHandler();
};

export const graphql = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
