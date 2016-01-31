
'use strict';

const hbs = require('handlebars');

hbs.registerHelper('log', function(val) {
  console.log(val)
});

hbs.registerHelper('ifEqual', function(val1, val2, options) {
  return val1 === val2 ? options.fn(this) : options.inverse(this);
});
