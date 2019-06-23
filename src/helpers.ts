import crypto from 'crypto';

// Container for all the helpers
export const helpers = {} as any;

// Create a SHA256 hash
helpers.hash = function(str) {
  if (typeof str === 'string' && str.length > 0) {
    return crypto
      .createHmac('sha256', ENV_HASHING_SECRET)
      .update(str)
      .digest('hex');
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases without throwing
helpers.parseJsonToObject = function(str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(strLength) {
  strLength = typeof strLength === 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    // Define all possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    // Start the string
    var str = '';
    for (let i = 1; i <= strLength; i++) {
      // Get a random character from possible characters string
      var rand = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append character to final string
      str += rand;
    }

    // return final string
    return str;
  } else {
    return false;
  }
};

helpers.checksum = function(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
};
