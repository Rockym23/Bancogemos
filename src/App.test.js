import { getQueriesForElement } from '@testing-library/react';
import React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App';

test('BancoGemos', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App/>, root);

  //after render
  //Use DOM Apis to make asserts

  const {getByText, getByLabelText} = getQueriesForElement(root);
  expect(getByText('BANCO GEMOS')).not.toBeNull();

  //expect(root.querySelector('h1').textContent).toBe('BANCO GEMOS');
  //expect(root.querySelector('a').textContent).toBe('BANCO GEMOS');
});
