import React from 'react'
import { PREV, NEXT } from '../utils/'

const pathPrefix = 'images/'

export default props => {

  const images = props.images.map( (val, idx) => {
    return (
      <img
        onClick={() => props.clickImageSelect(idx)}
        style={Object.assign({}, imgStyle, props.activeIdx==idx && imgStyleActive)}
        key={idx}
        src={pathPrefix + val}
      />
    )
  })

  const imageMain = props.activeImage ? <img src={pathPrefix + props.activeImage} /> : false

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

// TODO: Add propTypes

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
