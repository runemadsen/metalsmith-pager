
'use strict';

const path = require('path');

const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const evaluate = require('metalsmith-in-place');


const paginate = require('./index');


const ms = new Metalsmith(process.cwd());


ms
  .source('./sample/src')
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))

  /*
  .use(paginate({
    collection: 'posts',
    quantity: 5
  }))
  */

  .use(markdown())
  .use(evaluate({
    engine: 'handlebars',
    partials: './sample/src/__partials',
    cache: false
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './sample/src/__layouts'
  }))
  .destination('./sample/dist')
  .build(function(err) {
    if (err) {
      throw err;
    }
    console.log('DONE!');
  });
