import React, { Component } from 'react'
import API from '../../lib/api'
import Gallery from '../components/gallery'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {images: []}
  }

  componentDidMount() {
    API.getImages(this.handleApiData)
  }

  render() {
    return (
      <div>
        <Gallery images={this.state.images} />
      </div>
    )
  }

  handleApiData = (data) => {
    this.setState({
      images: data.items
    })
  };

}

export default Main
