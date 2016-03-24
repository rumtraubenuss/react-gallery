import React, {Component} from 'react'
import {reduxForm} from 'redux-form'

let LoginForm = (props) => {
    const {fields: {password, email}, handleSubmit} = props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <div>
          <input type="password" placeholder="Password" {...password}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(LoginForm)

export default LoginForm
