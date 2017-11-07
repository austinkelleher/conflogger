/*jshint -W030 */
'use strict';

const test = require('ava')
const conflogger = require('../');

test('should return configured logger if true passed', (t) => {
  const logger = conflogger.configure(true);
  t.is(typeof logger.info, 'function')
  logger.info('Should print this.');
});

test('should return noop logger if false passed', (t) => {
  const logger = conflogger.configure(false);
  t.is(typeof logger.info, 'function')
  logger.error('Should not print this.');
});

test('should add noop methods to logger that is passed without all logging functions', (t) => {
  let original = {
    info(msg) {
      console.log(msg);
    }
  };

  const logger = conflogger.configure(original);

  t.is(typeof logger.info, 'function')
  t.is(typeof logger.fatal, 'function')

  logger.info('Should print this');
  logger.fatal('Should print this');

  t.is(typeof original.info, 'function')
  t.is(typeof original.fatal, 'function')

  original.info('Should print this');
  original.fatal('Should print this');
});

test('should return noop logger if no logger passed', (t) => {
  const logger = conflogger.configure();
  t.is(typeof logger.info, 'function')

  logger.info('Should not print this');
  logger.fatal('Should not print this');
});

test('should accept a log level and only print within the level', (t) => {
  const logger = conflogger.configure(true, {
    logLevel: conflogger.logLevels.DEBUG
  });

  t.true(logger.isDebugEnabled())
  t.true(logger.isInfoEnabled())
  t.false(logger.isTraceEnabled())
});
