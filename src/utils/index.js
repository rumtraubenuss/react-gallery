export const NEXT = 'NEXT'
export const PREV = 'PREV'
export function paginate (items, pageCurrent, itemsPerPage, itemsPaginatedCurrent, direction=undefined) {
  if(typeof direction != 'undefined') {
    const cond_a = pageCurrent <= 1 && direction === PREV
    const cond_b = pageCurrent * itemsPerPage >= items.length && direction === NEXT
    if(cond_a || cond_b) {
      return(
        {
          items: itemsPaginatedCurrent,
          page: pageCurrent
        }
      )
    }
  }
  let newPage = pageCurrent
  if(direction === NEXT) newPage += 1
  if(direction === PREV) newPage -= 1
  return (
    {
      items: items.slice((newPage - 1) * itemsPerPage, newPage * itemsPerPage),
      page: newPage
    }
  )
}
