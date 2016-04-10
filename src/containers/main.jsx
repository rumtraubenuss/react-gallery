import React, { Component, PropTypes } from 'react'
import Gallery from '../components/gallery'
import LoginForm from '../components/login_form'
import FormPush from '../components/form_push'
import { connect } from 'react-redux'
import { triggerDummyTimeoutRedirect, selectItem, paginateImages, triggerLogin, triggerLogout, pushNode } from '../actions/'
import { getValues, reset } from 'redux-form'

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
    const { text } = getValues(this.props.formPush);
    this.props.dispatch(pushNode({ foo: text }))
    this.props.dispatch(reset('push'))
  };

  render() {
    const { images, loggedIn, busy } = this.props
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
        { loggedIn && <FormPush onSubmit={this.handlePush} /> }
        <p>Network status: {busy && <span>Transfering</span> || <span>Idle</span>} </p>
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
    formPush:  state.form.push,
    loggedIn: state.user.loggedIn,
    busy: state.network.busy,
  }
}

export default connect(select)(Main)
