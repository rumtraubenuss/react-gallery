import React, { Component } from 'react'
import Gallery from '../components/gallery'
import { connect } from 'react-redux'

class Main extends Component {
  render() {
    return (
      <div>
        <Gallery images={this.props.images} />
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
