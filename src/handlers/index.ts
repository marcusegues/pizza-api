import { usersHandler, UsersHandler } from './users';

interface Handlers {
  users: (data, callback) => any;
  notFound: (data, callback) => any;
  ping: (data, callback) => any;
}

interface SubHandlers {
  users: UsersHandler;
}

// first handler where keys are paths
export const handlers: Handlers = {
  users: (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) !== -1) {
      subHandlers.users[data.method](data, callback);
    }
  },
  notFound: (data, callback) => {
    callback(404);
  },
  ping: (data, callback) => {
    callback(200);
  },
};

// second handler where keys are HTTP methods
const subHandlers: SubHandlers = {
  users: usersHandler,
};
