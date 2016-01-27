import test from 'tape'

test('foo bar', t => {
  t.plan(2)
  t.equal(typeof Date.now, 'function')
  t.equal(typeof Math, 'object')
})
