
/**
 * @name filter-object
 * @function
 * @description It's like Array#filter, but it works on objects. It returns an Array.
 */

'use strict';

exports = module.exports = (obj, predicateFn) => Object.keys(obj).filter(predicateFn.bind(null, obj)).map(k => obj[k]);
