import React from 'react'
import ReactDOM from 'react-dom'

const dummy_api = [
  'dummy.jpg',
  'dummy.jpg',
  'dummy.jpg',
  'dummy.jpg',
  'dummy.jpg',
  'dummy.jpg',
  'dummy.jpg',
]
const pathPrefix = 'images/'

const Gallery = (props) => {
  const images = dummy_api.map((val, idx) => {
    const path = pathPrefix + val
    return <img key={idx} src={path} />
  })
  return (
    <div>{images}</div>
  )
}

ReactDOM.render(<Gallery/>, document.getElementById('app'))
