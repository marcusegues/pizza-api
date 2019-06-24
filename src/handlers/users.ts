import { tokens } from '../tokens';
import { dataInterface } from '../dataInterface';
import { DataObject } from '../../index';
import { helpers } from '../helpers';

export interface UsersHandler {
  get: (data, callback) => any;
  post: (data, callback) => any;
  put: (data, callback) => any;
  delete: (data, callback) => any;
}

/*
 * GET
 * Required data payload fields:
 */
const get = (data: DataObject, callback) => {
  if (typeof data.queryStringObject.username === 'object') {
    callback(403, 'Invalid username parameter.');
  } else if (typeof data.queryStringObject.username === 'string') {
    const username =
      data.queryStringObject.username.length < 30 ? data.queryStringObject.username.trim() : false;

    if (username) {
      const token = typeof data.headers.token === 'string' ? data.headers.token : false;
      tokens.verifyToken(token, username, isTokenValid => {
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
  }
};

const post = (data, callback) => {
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

const put = (data, callback) => {};

const delete_ = (data, callback) => {};

export const usersHandler: UsersHandler = {
  get,
  post,
  put,
  delete: delete_,
};
