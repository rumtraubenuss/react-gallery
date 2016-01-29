import test from 'tape'

test('foo bar', t => {
  t.plan(2)
  t.equal(typeof Date.now, 'object', 'Date.now should be a function')
  t.equal(typeof Math, 'function', 'Math should be an object')
})
