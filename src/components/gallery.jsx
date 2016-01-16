import React from 'react'

const pathPrefix = 'images/'

export default props => {

  const images = props.images.map((val, idx) => {
    const path = pathPrefix + val
    return <img key={idx} src={path} />
  })

  return (
    <div>{images}</div>
  )

}
