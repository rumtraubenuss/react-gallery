import React from 'react'

const pathPrefix = 'images/'

export default props => {

  const images = props.images.map( (val, idx) => {
    return (
      <img
        onClick={_ => props.handleClick(idx)}
        style={Object.assign({}, imgStyle, props.activeIdx==idx && imgStyleActive)}
        key={idx}
        src={pathPrefix + val}
      />
    )
  })

  const imageMain = props.activeImage ? <img src={pathPrefix + props.activeImage} /> : false

  return (
    <div>
      <p>{images}</p>
      {imageMain}
    </div>
  )

}

const imgStyle = {
  width: '10%',
  border: '2px solid',
  margin: '2px',
  borderColor: '#DDD',
  cursor: 'pointer'
}

const imgStyleActive = {
  borderColor: '#F00'
}
