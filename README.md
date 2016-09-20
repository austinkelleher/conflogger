conflogger
===========

Small module for configuring a logger. Falls back to noops for methods that
do not exist in the logger passed.

## Installation
```bash
npm install conflogger --save
```

## Usage

Conflogger can take a provided logger and fill methods that do not exist

```js
const conflogger = require('conflogger');

let originalLogger = {
  info(msg) {
    console.log(msg);
  }
};

let logger = conflogger.configure(originalLogger);

// Prints `Conflogger!`
logger.info('Conflogger!');

// Prints `Error!`
logger.error('Error!');
```

Conflogger can give you a basic logger. Free. Of. Charge.

```js
const conflogger = require('conflogger');

let logger = conflogger.configure(true);

// Prints `Conflogger!`
logger.info('Conflogger!');

// Prints `Error!`
logger.error('Error!');
```

Conflogger can even give you a noop logger. Woah.

```js
const conflogger = require('conflogger');

let logger = conflogger.configure();

// Does not print anything
logger.info('Conflogger!');

// Does not print anything
logger.error('Error!');
```
