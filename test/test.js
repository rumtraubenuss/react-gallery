import test from 'tape'
import { NEXT, PREV, paginate } from '../src/utils/'

test('utils', t => {
  t.notEqual(typeof NEXT, 'undefined', 'NEXT should not be undefined')
  t.notEqual(typeof PREV, 'undefined', 'PREV should not be undefined')
  t.equal(typeof paginate, 'function', 'paginate should be a function')
  t.end()
})
