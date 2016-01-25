import React, { PropTypes } from 'react'
import { PREV, NEXT } from '../utils/'

const pathPrefix = 'images/'

const Gallery = props => {

  const images = props.images.map( (val) => {
    return (
      <img
        onClick={() => props.clickImageSelect(val.id)}
        style={Object.assign({}, imgStyle, props.activeId === val.id && imgStyleActive)}
        key={val.id}
        src={pathPrefix + val.image}
      />
    )
  })

  const imageMain = props.activeImage ? <img src={pathPrefix + props.activeImage.image} /> : false

  return (
    <div>
      <p><a href="#" onClick={props.clickRedirect}>Click to redirect after timeout</a></p>
      <div>
        <button onClick={()=>props.clickPagination(PREV)} type="button">&lt;</button>
        <button onClick={()=>props.clickPagination(NEXT)} type="button">&gt;</button>
      </div>
      <p>{images}</p>
      {imageMain}
    </div>
  )

}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  clickImageSelect: PropTypes.func.isRequired,
  clickPagination: PropTypes.func.isRequired,
  clickRedirect: PropTypes.func.isRequired,
  activeId: PropTypes.number,
  activeImage: PropTypes.object
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

export default Gallery

