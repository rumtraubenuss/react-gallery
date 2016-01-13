import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'

const pathPrefix = 'images/'

const API = {}
API.getImages = function() {
  return (
    fetch('http://localhost:8081/api')
    .then(function(response) {
      return response.json()
    })
  )
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

  constructor(props) {
    super(props)
    this.state = {images: []}
  }

  componentDidMount() {
    API.getImages().then((json) => {
      this.setState({
        images: json.items
      })
    })
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
