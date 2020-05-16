import { ApolloServer } from 'apollo-server-lambda';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloGateway } from '@apollo/gateway';

const createHandler = async () => {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'posts', url: 'https://vcis90cesa.execute-api.eu-west-1.amazonaws.com/dev/posts' },
      { name: 'users', url: 'https://vcis90cesa.execute-api.eu-west-1.amazonaws.com/dev/users' },
    ],
  });

  const server = new ApolloServer({
    playground: { endpoint: '/dev/graphql' },
    gateway,
    subscriptions: false,
  });
  return server.createHandler();
};

export const graphql = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
