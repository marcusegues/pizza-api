// module for storing and editing data saved to disk
import fs from 'fs';
import path from 'path';
import { helpers } from './helpers';

interface DataInterface {
  baseDir: string;
  create: (dir: string, file: string, data: any, callback: (err: any, data?: any) => any) => void;
  read: (dir: string, file: string, callback: (err: any, data?: any) => any) => void;
  update: (dir: string, file: string, data: {}, callback: (err: any, data?: any) => any) => void;
  delete: (dir: string, file: string, callback: (err: any, data?: any) => any) => void;
}

export const dataInterface = {} as DataInterface;

dataInterface.baseDir = path.join(__dirname, '../.data');

// Write data to a file
dataInterface.create = function(dir, file, data, callback) {
  console.log('In create dir is ', path.join(__dirname));
  const filePath = `${dataInterface.baseDir}/${dir}/${file}.json`;
  console.log('file path is ', filePath);
  // Open the file for writing
  fs.open(filePath, 'wx', function(err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err) {
        if (!err) {
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file: ' + err);
    }
  });
};

dataInterface.read = function(dir, file, callback) {
  const filePath = `${dataInterface.baseDir}/${dir}/${file}.json`;
  console.log(`Reading in ${filePath}`);
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (!err && data) {
      var parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

dataInterface.update = function(dir, file, data, callback) {
  const filePath = dataInterface.baseDir + dir + '/' + file + '.json';
  // open the file for writing
  console.log('Opening ', filePath);
  fs.open(filePath, 'r+', function(err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      var stringData = JSON.stringify(data);

      // truncate the file
      fs.ftruncate(fileDescriptor, function(err) {
        if (!err) {
          // write to the file and close it
          fs.writeFile(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing existing file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open file for updating, it may not exist yet.');
    }
  });
};

dataInterface.delete = function(dir, file, callback) {
  const filePath = dataInterface.baseDir + dir + '/' + file + '.json';
  // unlink the file
  fs.unlink(filePath, function(err) {
    if (!err) {
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};
