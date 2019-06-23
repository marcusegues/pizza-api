export interface UsersHandler {
  get: (data, callback) => any;
  post: (data, callback) => any;
  put: (data, callback) => any;
  delete: (data, callback) => any;
}

/*
 * POST
 * Required data payload fields:
 */
const get = (data, callback) => {};

const post = (data, callback) => {};

const put = (data, callback) => {};

const delete_ = (data, callback) => {};

export const usersHandler: UsersHandler = {
  get,
  post,
  put,
  delete: delete_,
};
