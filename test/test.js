import test from 'tape'

test('utils', t => {
  const { NEXT, PREV, paginate } = require('../src/utils/')
  const item_ar = [1,2,3]
  let paged

  t.notEqual(typeof NEXT, 'undefined',
    'NEXT should not be undefined')

  t.notEqual(typeof PREV, 'undefined',
    'PREV should not be undefined')

  t.equal(typeof paginate, 'function',
    'paginate should be a function')

  paged = paginate(item_ar, 1, 2)

  t.equal(paged.items.length, 2,
    'Items should contain two items')

  t.equal(paged.page, 1,
    'Page should stay at 1')

  paged = paginate(item_ar, 1, 2, null, NEXT)

  t.equal(paged.items.length, 1,
    'Items should contain one item')

  t.equal(paged.page, 2,
    'Page should be increased to 2')

  paged = paginate(item_ar, 2, 2, null, PREV)

  t.equal(paged.items.length, 2,
    'Items should contain two items')

  t.equal(paged.page, 1,
    'Page should be decreased to 1')

  t.end()
})
