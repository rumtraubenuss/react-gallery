import React from 'react';
import test from 'tape';
import { LoginForm } from '../src/components/login_form';
import { shallow } from 'enzyme';

test('Login form render output', t => {
  const component = shallow(<LoginForm  fields={{ password: {}, email: {} }}/>);

  const expected = {
    input: 2,
    submit: 1,
  };
  const actual = {
    input: component.find('input').length,
    submit: component.find('button').length,
  }

  t.deepEqual(expected, actual, 'It should render 2 input fields and 1 submit button');
  t.end();
});
