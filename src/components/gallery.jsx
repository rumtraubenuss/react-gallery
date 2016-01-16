import React from 'react'

const pathPrefix = 'images/'

export default props => {

  const images = props.images.map( (val, idx) => <img key={idx} src={pathPrefix + val} /> )

  return <div>{images}</div>

}
