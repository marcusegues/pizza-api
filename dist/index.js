/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/handlers */ \"./src/handlers/index.ts\");\n/* harmony import */ var _src_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/helpers */ \"./src/helpers.ts\");\n// Dependencies\n\nconst StringDecoder = __webpack_require__(/*! string_decoder */ \"string_decoder\").StringDecoder;\nconst http = __webpack_require__(/*! http */ \"http\");\n\n\nconst server = http.createServer(function (req, res) {\n    console.log('Request url is ' + req.url);\n    // Get the url and parse it\n    const parsedUrl = url__WEBPACK_IMPORTED_MODULE_0__[\"parse\"](req.url, true);\n    // Get the path\n    const path = parsedUrl.pathname;\n    const trimmedPath = (path && path.replace(/^\\/+|\\/+$/g, '')) || '';\n    // Get the query string as an object\n    const queryStringObject = parsedUrl.query;\n    // Get the HTTP method\n    const method = req.method.toLowerCase();\n    // Get the headers as an object\n    const headers = req.headers;\n    // Get the payload, if any\n    const decoder = new StringDecoder('utf-8');\n    let buffer = '';\n    req.on('data', function (data) {\n        buffer += decoder.write(data);\n    });\n    req.on('end', function () {\n        buffer += decoder.end();\n        // given the path in the url, choose which handler should handle this request\n        const chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : _src_handlers__WEBPACK_IMPORTED_MODULE_1__[\"handlers\"].notFound;\n        // construct data object to send to the handler\n        const data = {\n            queryStringObject,\n            method,\n            headers,\n            payload: _src_helpers__WEBPACK_IMPORTED_MODULE_2__[\"helpers\"].parseJsonToObject(buffer),\n        };\n        // route the request to the handler\n        chosenHandler(data, function (statusCode, payload) {\n            // use  status code called back by handler or use default status code 200\n            statusCode = typeof statusCode == 'number' ? statusCode : 200;\n            // use payload called back by handler or use default: empty object\n            payload = typeof payload == 'object' ? payload : {};\n            // convert payload to string, to be sent back to user\n            const payloadString = JSON.stringify(payload);\n            // Send the response\n            // writeHead writes status code to the response\n            res.setHeader('Content-Type', 'application/json');\n            res.writeHead(statusCode);\n            res.end(payloadString);\n            console.log('Returning this response ', statusCode, payloadString);\n        });\n    });\n});\n// Start server, listen on port 3000\nserver.listen(\"5000\", function () {\n    console.log('The server is listening on port ' + \"5000\");\n});\n// Define request router\nconst router = {\n    ping: _src_handlers__WEBPACK_IMPORTED_MODULE_1__[\"handlers\"].ping,\n    users: _src_handlers__WEBPACK_IMPORTED_MODULE_1__[\"handlers\"].users,\n};\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./src/handlers/index.ts":
/*!*******************************!*\
  !*** ./src/handlers/index.ts ***!
  \*******************************/
/*! exports provided: handlers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handlers\", function() { return handlers; });\n/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users */ \"./src/handlers/users.ts\");\n\n// first handler where keys are paths\nconst handlers = {\n    users: (data, callback) => {\n        const acceptableMethods = ['get', 'post', 'put', 'delete'];\n        if (acceptableMethods.indexOf(data.method) !== -1) {\n            subHandlers.users[data.method](data, callback);\n        }\n    },\n    notFound: (data, callback) => {\n        callback(404);\n    },\n    ping: (data, callback) => {\n        callback(200);\n    },\n};\n// second handler where keys are HTTP methods\nconst subHandlers = {\n    users: _users__WEBPACK_IMPORTED_MODULE_0__[\"usersHandler\"],\n};\n\n\n//# sourceURL=webpack:///./src/handlers/index.ts?");

/***/ }),

/***/ "./src/handlers/users.ts":
/*!*******************************!*\
  !*** ./src/handlers/users.ts ***!
  \*******************************/
/*! exports provided: usersHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"usersHandler\", function() { return usersHandler; });\n/*\n * POST\n * Required data payload fields:\n */\nconst get = (data, callback) => { };\nconst post = (data, callback) => { };\nconst put = (data, callback) => { };\nconst delete_ = (data, callback) => { };\nconst usersHandler = {\n    get,\n    post,\n    put,\n    delete: delete_,\n};\n\n\n//# sourceURL=webpack:///./src/handlers/users.ts?");

/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/*! exports provided: helpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"helpers\", function() { return helpers; });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\n// Container for all the helpers\nconst helpers = {};\n// Create a SHA256 hash\nhelpers.hash = function (str) {\n    if (typeof str === 'string' && str.length > 0) {\n        return crypto__WEBPACK_IMPORTED_MODULE_0___default.a\n            .createHmac('sha256', \"thisisasecret\")\n            .update(str)\n            .digest('hex');\n    }\n    else {\n        return false;\n    }\n};\n// Parse a JSON string to an object in all cases without throwing\nhelpers.parseJsonToObject = function (str) {\n    try {\n        var obj = JSON.parse(str);\n        return obj;\n    }\n    catch (e) {\n        return {};\n    }\n};\n// Create a string of random alphanumeric characters of a given length\nhelpers.createRandomString = function (strLength) {\n    strLength = typeof strLength === 'number' && strLength > 0 ? strLength : false;\n    if (strLength) {\n        // Define all possible characters that could go into a string\n        var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';\n        // Start the string\n        var str = '';\n        for (let i = 1; i <= strLength; i++) {\n            // Get a random character from possible characters string\n            var rand = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));\n            // Append character to final string\n            str += rand;\n        }\n        // return final string\n        return str;\n    }\n    else {\n        return false;\n    }\n};\nhelpers.checksum = function (str, algorithm, encoding) {\n    return crypto__WEBPACK_IMPORTED_MODULE_0___default.a\n        .createHash(algorithm || 'md5')\n        .update(str, 'utf8')\n        .digest(encoding || 'hex');\n};\n\n\n//# sourceURL=webpack:///./src/helpers.ts?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"string_decoder\");\n\n//# sourceURL=webpack:///external_%22string_decoder%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ })

/******/ });