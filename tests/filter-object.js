
'use strict';

const tape = require('tape');
const sinon = require('sinon');

const filterObj = require('../lib/filter-object');


tape('filter-object.js:', function(t) { t.end(); });

tape('check arguments passed to the predicate fn', function(t) {

  const obj = { foo: 'bar', baz: 42 };
  const spy = sinon.spy();

  filterObj(obj, spy);

  t.ok(spy.calledTwice, 'predicate is called two times');
  t.ok(spy.alwaysCalledOn(null), 'check context')
  t.ok(spy.getCall(0).calledWith(obj, 'foo', 0, ['foo', 'baz']), 'check argument first call');
  t.ok(spy.getCall(1).calledWith(obj, 'baz', 1, ['foo', 'baz']), 'check argument second call');

  t.end();

});

tape('filter flat object', function(t) {

  const obj = { foo: 'bar', baz: 42 };

  const res0 = filterObj(obj, function(all, key, index, allKeys) { return obj[key] === true; });
  t.ok(Array.isArray(res0) && res0.length == 0, 'result is always an array');


  const res1 = filterObj(obj, function(all, key, index, allKeys) { return obj[key] === 42; });
  t.ok(Array.isArray(res1) && res1.length == 1, 'result is always an array');
  t.equal(res1[0], 42, 'check result value')

  t.end();

});

tape('filter nested object', function(t) {

  const obj = { foo: { greet: 'hello', who: 'world' }, baz: { greet: 'hello', who: 'moon' } };

  const res0 = filterObj(obj, function(all, key, index, allKeys) { return obj[key].who === 'moon'; });
  t.ok(Array.isArray(res0) && res0.length == 1, 'result is always an array');
  t.deepEqual(res0[0], { greet: 'hello', who: 'moon' }, 'check result value')

  t.end();

});
