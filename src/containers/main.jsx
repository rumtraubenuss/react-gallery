import React, { Component, PropTypes } from 'react'
import Gallery from '../components/gallery'
import LoginForm from '../components/login_form'
import { connect } from 'react-redux'
import { triggerDummyTimeoutRedirect, selectItem, paginateImages, triggerLogin, triggerLogout } from '../actions/'
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
    this.props.dispatch(triggerLogin(email, password))
  };

  handleLogout = () => {
    this.props.dispatch(triggerLogout())
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
        {loggedIn && <a onClick={this.handleLogout} href="#">LOGOUT</a> || <LoginForm onSubmit={this.handleLoginFormSubmit} />}
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
