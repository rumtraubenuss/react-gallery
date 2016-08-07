import React from 'react';
import test from 'tape';
import { LoginForm } from '../src/components/login_form';
import { shallow } from 'enzyme';
import sinon from 'sinon';

test('Login form render output', t => {
  const component = shallow(<LoginForm fields={{ password: {}, email: {} }}/>);

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

test('Login form on submit', t => {
  const handleSubmitSpy = sinon.spy();
  const component = shallow(
    <LoginForm handleSubmit={handleSubmitSpy}
               fields={{ password: {}, email: {} }}
    />
  );

  component.find('form').simulate('submit');

  const expected = 1;
  const actual = handleSubmitSpy.callCount;

  t.equal(expected, actual, 'It should call handleSubmit on submit');
  t.end();
});
