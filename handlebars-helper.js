
'use strict';

const hbs = require('handlebars');

hbs.registerHelper('log', function(val) {
  console.log(val)
});

hbs.registerHelper('ifEqual', function(val1, vval2, options) {
  return val1 === vval2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('lessThan', function (val, limit, options) {
  return val < limit ? options.fn(this) : options.inverse(this);
});
