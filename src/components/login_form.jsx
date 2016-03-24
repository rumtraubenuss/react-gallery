import React, {Component} from 'react'
import {reduxForm} from 'redux-form'

let LoginForm = (props) => {
    const {fields: {password, email}, handleSubmit} = props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <div>
          <label>Last Name</label>
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
