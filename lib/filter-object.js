
'use strict';

exports = module.exports = (obj, predicateFn) => Object.keys(obj).filter(predicateFn.bind(null, obj)).map(k => obj[k]);
