import React from 'react'
import { reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if(!values.text) {
    errors.text = 'Required'
  }
  return errors
}

let FormPush = (props) => {
  const { fields: { text }, handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="" {...text}/>
        {text.touched && text.error && <div>{text.error}</div>}
      </div>
      <button type="submit" disabled={submitting}>Submit</button>
    </form>
  )
}

FormPush = reduxForm({
  form: 'push',
  fields: ['text'],
  validate,
})(FormPush)

export default FormPush
