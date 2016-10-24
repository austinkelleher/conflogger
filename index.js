'use strict';

function noop() {}

const logLevels = exports.logLevels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  FATAL: 5,
  OFF: 6
};

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

const logLevelMap = {
  isTraceEnabled(logLevel) {
    return logLevel === logLevels.TRACE;
  },

  isDebugEnabled(logLevel) {
    return logLevel <= logLevels.DEBUG;
  },

  isInfoEnabled(logLevel) {
    return logLevel <= logLevels.INFO;
  },

  isWarnEnabled(logLevel) {
    return logLevel <= logLevels.ERROR;
  },

  isFatalEnabled(logLevel) {
    return logLevel <= logLevel.FATAL;
  }
};

let loggerNoopsMap = {};

for (let method in loggerMethodsMap) {
  loggerNoopsMap[method] = noop;
}

const logLevelFalse = () => false;
function enabledMethod(logLevel, mapMethod) {
  return () => mapMethod(logLevel);
}

function _buildLogLevelMap(logger, logLevel) {
  const logLevelExists = typeof logLevel !== 'undefined';

  for (let method in logLevelMap) {
    if (!logger[method]) {
      if (logLevelExists) {
        let mapMethod = logLevelMap[method];
        logger[method] = enabledMethod(logLevel, mapMethod);
      } else {
        // Always return false if logLevel was undefined
        logger[method] = logLevelFalse;
      }
    }
  }
}

exports.configure = (logger, options) => {
  options = options || {};

  let {
    logLevel
  } = options;

  if (logger === true) {
    logger = Object.assign({}, loggerMethodsMap);
  } else if (logger) {
    for (let method in loggerMethodsMap) {
      if (!logger[method]) {
        logger[method] = loggerMethodsMap[method];
      }
    }
  } else {
    logger = Object.assign({}, loggerNoopsMap);
  }

  _buildLogLevelMap(logger, logLevel);
  return logger;
};
