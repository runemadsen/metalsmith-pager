
'use strict';

const hbs = require('handlebars');

hbs.registerHelper('log', function(val) {
  console.log(val)
});

hbs.registerHelper('ifEqual', function(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
