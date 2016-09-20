'use strict';

function noop() {}

const loggerMethodsMap = {
  debug: console.log.bind(console),
  info: console.log.bind(console),
  success: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  critical: console.error.bind(console),
  alert: console.log.bind(console),
  emergency: console.error.bind(console),
  notice: console.log.bind(console),
  verbose: console.log.bind(console),
  fatal: console.error.bind(console)
};

let loggerNoopsMap = {};

for (let method in loggerMethodsMap) {
  loggerNoopsMap[method] = noop;
}

exports.configure = (logger) => {
  if (logger === true) {
    return loggerMethodsMap;
  } else if (logger) {
    for (let method in loggerMethodsMap) {
      if (!logger[method]) {
        logger[method] = loggerMethodsMap[method];
      }
    }
    return logger;
  } else {
    return loggerNoopsMap;
  }
};
