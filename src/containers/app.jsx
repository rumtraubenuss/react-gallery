import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class App extends Component {

  render() {
    return (
      <div>
        <Link to="/">Gallery</Link>
        {' '}
        <Link to="/blank">Blank</Link>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default connect()(App)
