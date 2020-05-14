import postsGQL from './services/posts/lambda';
import usersGQL from './services/users/lambda';

export const posts = postsGQL;
export const users = usersGQL;
