import React, { Component } from 'react'
import Gallery from '../components/gallery'
import { connect } from 'react-redux'
import { triggerDummyTimeoutRedirect, selectItem, paginateImages } from '../actions/'

class Main extends Component {

  handleClickImageSelect = (idx) => {
    this.props.dispatch(selectItem(idx))
  };

  handleClickRedirect = () => {
    this.props.dispatch(triggerDummyTimeoutRedirect())
  };

  handleClickPagination = direction => {
    this.props.dispatch(paginateImages(direction))
  };

  render() {
    const { images } = this.props
    return (
      <div>
        <Gallery
          clickImageSelect={this.handleClickImageSelect}
          clickRedirect={this.handleClickRedirect}
          activeIdx={images.selectedItem}
          images={images.itemsPaginated}
          activeImage={images.items[images.selectedItem]}
          clickPagination={this.handleClickPagination}
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
