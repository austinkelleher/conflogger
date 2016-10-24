/*jshint -W030 */
'use strict';

const conflogger = require('../');
const chai = require('chai');
const expect = chai.expect;

chai.should();
chai.config.includeStack = true;

describe('Conflogger tests', function() {
  it('should return configured logger if true passed', () => {
    const logger = conflogger.configure(true);
    expect(logger.info).to.be.a('function');

    logger.info('Should print this.');
  });

  it('should return noop logger if false passed', () => {
    const logger = conflogger.configure(false);
    expect(logger.info).to.be.a('function');

    logger.error('Should not print this.');
  });

  it('should add noop methods to logger that is passed without all logging functions', () => {
    let original = {
      info(msg) {
        console.log(msg);
      }
    };

    const logger = conflogger.configure(original);

    expect(logger.info).to.be.a('function');
    expect(logger.fatal).to.be.a('function');

    logger.info('Should print this');
    logger.fatal('Should print this');

    expect(original.info).to.be.a('function');
    expect(original.fatal).to.be.a('function');

    original.info('Should print this');
    original.fatal('Should print this');
  });

  it('should return noop logger if no logger passed', () => {
    const logger = conflogger.configure();
    expect(logger.info).to.be.a('function');

    logger.info('Should not print this');
    logger.fatal('Should not print this');
  });

  it('should accept a log level and only print within the level', () => {
    const logger = conflogger.configure(true, {
      logLevel: conflogger.logLevels.DEBUG
    });

    if (!logger.isDebugEnabled()) {
      throw new Error('DEBUG mode should be enabled.');
    }

    if (!logger.isInfoEnabled()) {
      throw new Error('INFO mode should be enabled.');
    }

    if (logger.isTraceEnabled()) {
      throw new Error('Trace should not be enabled.');
    }
  });
});
