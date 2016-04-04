import React, { Component, PropTypes } from 'react'
import Gallery from '../components/gallery'
import LoginForm from '../components/login_form'
import { connect } from 'react-redux'
import { triggerDummyTimeoutRedirect, selectItem, paginateImages, triggerLogin, triggerLogout, pushNode } from '../actions/'
import { getValues } from 'redux-form'

class Main extends Component {

  handleClickImageSelect = (id) => {
    this.props.dispatch(selectItem(id))
  };

  handleClickRedirect = () => {
    this.props.dispatch(triggerDummyTimeoutRedirect())
  };

  handleClickPagination = direction => {
    this.props.dispatch(paginateImages(direction))
  };

  handleLoginFormSubmit = () => {
    const { email, password } = getValues(this.props.loginForm);
    return this.props.dispatch(triggerLogin(email, password))
  };

  handleLogout = () => {
    this.props.dispatch(triggerLogout())
  };

  handlePush = () => {
    this.props.dispatch(pushNode({ foo:'bar' }))
  };

  render() {
    const { images, loggedIn } = this.props
    return (
      <div>
        <Gallery
          clickImageSelect={this.handleClickImageSelect}
          clickRedirect={this.handleClickRedirect}
          activeId={images.selectedItem}
          images={images.itemsPaginated}
          activeImage={images.items[images.selectedItem]}
          clickPagination={this.handleClickPagination}
        />
        {loggedIn && <a onClick={this.handleLogout} href="#">LOGOUT</a>
          || <LoginForm onSubmit={this.handleLoginFormSubmit} />}
        {loggedIn && <p><a onClick={this.handlePush} href="#">PUSH</a></p>}
      </div>
    )
  }
}

Main.propTypes = {
  images: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function select(state) {
  return {
    images: state.images,
    loginForm:  state.form.login,
    loggedIn: state.user.loggedIn,
  }
}

export default connect(select)(Main)
