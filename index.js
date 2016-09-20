'use strict';

function noop() {}

const loggerMethodsMap = {
  debug: console.log,
  info: console.log,
  success: console.log,
  warn: console.warn,
  error: console.error,
  critical: console.error,
  alert: console.log,
  emergency: console.error,
  notice: console.log,
  verbose: console.log,
  fatal: console.error
};

let loggerNoopsMap = {};

for (let method in loggerMethodsMap) {
  loggerNoopsMap[method] = noop;
}

exports.configure = (logger) => {
  if (logger === true) {
    logger = {};

    for (let method in loggerMethodsMap) {
      logger[method] = loggerMethodsMap[method].bind(console);
    }
  } else if (logger) {
    for (let method in loggerMethodsMap) {
      if (!logger[method]) {
        logger[method] = noop;
      }
    }
  } else {
    logger = loggerNoopsMap;
  }

  return logger;
};
