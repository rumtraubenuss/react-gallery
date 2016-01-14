import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'

const pathPrefix = 'images/'

const API = {}
API.getImages = function(callback) {
  fetch('http://localhost:8081/api')
  .then(function(response) {
    return response.json()
  })
  .then(function(json){
    callback(json)
  })
  .catch(function(ex){
    console.log('Could not fetch data from API', ex)
  })
}

const Gallery = (props) => {

  const images = props.images.map((val, idx) => {
    const path = pathPrefix + val
    return <img key={idx} src={path} />
  })

  return (
    <div>{images}</div>
  )

}

class Main extends React.Component {

  handleApiData = (data) => {
    this.setState({
      images: data.items
    })
  };

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

}

ReactDOM.render(<Main/>, document.getElementById('app'))
