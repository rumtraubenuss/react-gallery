import React, { Component, PropTypes } from 'react'
import Gallery from '../components/gallery'
import LoginForm from '../components/login_form'
import { connect } from 'react-redux'
import { triggerDummyTimeoutRedirect, selectItem, paginateImages } from '../actions/'
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
    const myFormValues = getValues(this.props.loginForm);
    console.log('FORM_DATA: ', myFormValues);
  };

  render() {
    const { images } = this.props
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
        <LoginForm onSubmit={this.handleLoginFormSubmit} />
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
  }
}

export default connect(select)(Main)
