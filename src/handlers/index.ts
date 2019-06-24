import { usersHandler, UsersHandler } from './users';
import { tokensHandler, TokensHandler } from '../tokens';

interface Handlers {
  users: (data, callback) => any;
  tokens: (data, callback) => any;
  notFound: (data, callback) => any;
  ping: (data, callback) => any;
}

interface SubHandlers {
  users: UsersHandler;
  tokens: TokensHandler;
}

// first handler where keys are paths
export const handlers: Handlers = {
  users: (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) !== -1) {
      subHandlers.users[data.method](data, callback);
    }
  },
  tokens: (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) !== -1) {
      subHandlers.tokens[data.method](data, callback);
    }
  },
  notFound: (data, callback) => {
    callback(404, { error: 'That route does not exist.' });
  },
  ping: (data, callback) => {
    callback(200);
  },
};

// second handler where keys are HTTP methods
const subHandlers: SubHandlers = {
  users: usersHandler,
  tokens: tokensHandler,
};
