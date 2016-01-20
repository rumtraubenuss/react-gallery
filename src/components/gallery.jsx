import React from 'react'

const pathPrefix = 'images/'

export default props => {

  const images = props.images.map( (val, idx) => {
    return (
      <img
        style={Object.assign({}, imgStyle, props.activeIdx==idx && imgStyleActive)}
        key={idx}
        src={pathPrefix + val}
      />
    )
  })

  return <div>{images}</div>

}

const imgStyle = {
  width: '10%',
  border: '2px solid #DDD',
  margin: '2px'
}

const imgStyleActive = {
  borderColor: '#F00'
}
