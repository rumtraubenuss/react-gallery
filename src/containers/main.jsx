import React, { Component } from 'react'
import Gallery from '../components/gallery'
import { connect } from 'react-redux'

class Main extends Component {
  render() {
    const { images } = this.props
    return (
      <div>
        <Gallery activeIdx="0" images={images} />
      </div>
    )
  }
}

function select(state) {
  return {
    images: state.images
  }
}

export default connect(select)(Main)
