import React, {Component} from 'react'
import {reduxForm} from 'redux-form'

const validate = values => {
  const errors = {}
  if(!values.email) {
    errors.email = 'Required'
  }
  if(!values.password) {
    errors.password = 'Required'
  }
  return errors
}

let LoginForm = (props) => {
    const {fields: {password, email}, handleSubmit} = props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" placeholder="Email" {...email}/>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <input type="password" placeholder="Password" {...password}/>
          {password.touched && password.error && <div>{password.error}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    )
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate,
})(LoginForm)

export default LoginForm
