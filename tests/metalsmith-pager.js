
'use strict';

const tape = require('tape');
const sinon = require('sinon');

const pager = require('../index');


tape('metalsmith-pager.js:', function(t) { t.end(); });

tape('check validate settings', function(t) {

  const logSpy = sinon.spy(console, 'log');
  const options = {};

  let res1 = pager(options);
  t.ok(logSpy.calledOnce, 'log fatal error');
  t.ok(logSpy.getCall(0).args[0].indexOf('The "collection" setting must be specified') > 0, 'check log info');
  t.strictEqual(res1, undefined, 'returns void');

  logSpy.reset();

  options.collection = 'posts';

  let res2 = pager(options);
  t.ok(logSpy.calledOnce, 'log fatal error');
  t.ok(logSpy.getCall(0).args[0].indexOf('The "layoutName" setting must be specified') > 0, 'check log info');
  t.strictEqual(res2, undefined, 'returns void');

  logSpy.reset();

  options.layoutName = 'archive.html';

  let res3 = pager(options);
  t.ok(logSpy.calledOnce, 'log fatal error');
  t.ok(logSpy.getCall(0).args[0].indexOf('The "paginationTemplatePath" setting must be specified') > 0, 'check log info');
  t.strictEqual(res3, undefined, 'returns void');

  logSpy.reset();

  options.paginationTemplatePath = '__partials/pager.html';

  let res4 = pager(options);
  t.ok(logSpy.calledOnce, 'log fatal error');
  t.ok(logSpy.getCall(0).args[0].indexOf('The "elementsPerPage" setting must be specified') > 0, 'check log info');
  t.strictEqual(res4, undefined, 'returns void');

  logSpy.reset();

  options.elementsPerPage = 5;

  let res5 = pager(options);
  t.strictEqual(typeof res5, 'function', 'returns the plugin function');

  t.end();

});
