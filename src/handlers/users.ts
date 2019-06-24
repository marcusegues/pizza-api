import { tokensHandler } from '../tokens';
import { dataInterface } from '../dataInterface';
import { DataObject } from '../../index';
import { helpers } from '../helpers';

export interface UsersHandler {
  get: (data, callback) => any;
  post: (data, callback) => any;
  put: (data, callback) => any;
  delete: (data, callback) => any;
}

export const usersHandler = {} as UsersHandler;

/*
 * GET
 * Required data payload fields:
 */
usersHandler.get = (data: DataObject, callback) => {
  if (typeof data.queryStringObject.username === 'object') {
    callback(403, 'Invalid username parameter.');
  } else if (typeof data.queryStringObject.username === 'string') {
    const username =
      data.queryStringObject.username.length < 30 ? data.queryStringObject.username.trim() : false;
    if (username) {
      const token = typeof data.headers.token === 'string' ? data.headers.token : false;
      tokensHandler.verifyToken(token, username, isTokenValid => {
        if (isTokenValid) {
          dataInterface.read('users', username, (err, userData) => {
            if (err) {
              callback(500, { error: 'Error retrieving user.' });
            } else {
              callback(200, userData);
            }
          });
        } else {
          callback(403, { error: 'Invalid authentication token.' });
        }
      });
    } else {
      callback(403, { error: 'Username must be shorter than 30 characters.' });
    }
  } else {
    callback(400, { error: 'Missing query string parameter' });
  }
};

usersHandler.post = (data, callback) => {
  const username =
    typeof data.payload.username === 'string' && data.payload.username.length < 30
      ? data.payload.username.trim()
      : false;
  const password =
    typeof data.payload.password === 'string' && data.payload.password.length > 0
      ? data.payload.password
      : false;
  const email =
    typeof data.payload.email === 'string' &&
    data.payload.email.length > 0 &&
    helpers.validateEmail(data.payload.email)
      ? data.payload.email
      : false;
  const address =
    typeof data.payload.address === 'string' && data.payload.address.length > 0
      ? data.payload.address
      : false;

  if (username && password && email && address) {
    dataInterface.read('users', username, (err, userData) => {
      if (err) {
        const hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          const newUser = {
            username,
            hashedPassword,
            email,
            address,
          };
          dataInterface.create('users', username, newUser, err => {
            if (!err) {
              callback(200);
            } else {
              callback(500, { error: `Error creating new user: ${err}` });
            }
          });
        } else {
          callback(500, { error: 'Error creating new user: could not hash password.' });
        }
      } else {
        callback(422, { error: 'Username already exists.' });
      }
    });
  } else {
    callback(403, { error: 'Missing or invalid required fields.' });
  }
};

usersHandler.put = (data, callback) => {
  const username =
    typeof data.payload.username === 'string' && data.payload.username.length < 30
      ? data.payload.username.trim()
      : false;
  const password =
    typeof data.payload.password === 'string' && data.payload.password.length > 0
      ? data.payload.password
      : false;
  const email =
    typeof data.payload.email === 'string' &&
    data.payload.email.length > 0 &&
    helpers.validateEmail(data.payload.email)
      ? data.payload.email
      : false;
  const address =
    typeof data.payload.address === 'string' && data.payload.address.length > 0
      ? data.payload.address
      : false;
  console.log(data.headers.token);
  if (username) {
    if (email || password || address) {
      var token = typeof data.headers.token === 'string' ? data.headers.token : false;
      tokensHandler.verifyToken(token, username, isTokenValid => {
        if (isTokenValid) {
          dataInterface.read('users', username, (err, userData) => {
            const newUser = {
              ...userData,
              email: email || userData.email,
              password: password || userData.password,
              address: address || userData.address,
            };

            dataInterface.update('users', username, newUser, err => {
              if (!err) {
                callback(200);
              } else {
                callback(500, { error: 'Error updating user data.' });
              }
            });
          });
        } else {
          callback(403, { error: 'Invalid token.' });
        }
      });
    }
  } else {
    callback(403, { error: 'Missing required field: username' });
  }
};

usersHandler.delete = (data, callback) => {
  const username =
    typeof data.payload.username === 'string' && data.payload.username.length < 30
      ? data.payload.username.trim()
      : false;

  if (username) {
    const token = typeof data.headers.token === 'string' ? data.headers.token : false;
    tokensHandler.verifyToken(token, username, isTokenValid => {
      if (isTokenValid) {
        dataInterface.read('users', username, err => {
          if (!err) {
            dataInterface.delete('users', username, err => {
              if (!err) {
                callback(200);
              } else {
                callback(500, { error: 'Error deleting user' });
              }
            });
          } else {
            callback(400, { error: 'Could not find specified user' });
          }
        });
      } else {
        callback(403, { error: 'Invalid token.' });
      }
    });
  }
};
