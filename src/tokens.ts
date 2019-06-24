import { dataInterface } from './dataInterface';

interface Token {
  id: string;
  email: string;
  expires: number;
}

interface Tokens {
  verifyToken: (id: any, email: string, callback: (err: boolean) => any) => void;
}

export const tokens = {} as Tokens;

// Verify if a given token id is currently valid for a given user
tokens.verifyToken = (id, email, callback) => {
  if (typeof id !== 'string') {
    callback(false);
  }
  // Lookup the token
  dataInterface.read('tokens', id, (err, tokenData: Token) => {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.email === email && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};
