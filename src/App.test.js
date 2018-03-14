import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('welcomes you', () => {
  const app = shallow(<App />);
  expect(app.text()).toContain('Welcome to React');
})
