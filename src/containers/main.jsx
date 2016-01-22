import React, { Component } from 'react'
import Gallery from '../components/gallery'
import { connect } from 'react-redux'
import { selectItem } from '../actions/'

class Main extends Component {

  handleClick = (idx) => {
    this.props.dispatch(selectItem(idx))
  };

  render() {
    const { images } = this.props
    return (
      <div>
        <Gallery
          handleClick={this.handleClick}
          activeIdx={images.selectedItem}
          images={images.items}
          activeImage={images.items[images.selectedItem]}
        />
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
