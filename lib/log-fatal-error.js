
'use strict';

const chalk = require('chalk');


/**
 * @name log-fatal-error
 * @function
 * @description Log the message with the style of a fatal error.
 */

exports = module.exports = message => console.log(chalk.bold.red(message));
