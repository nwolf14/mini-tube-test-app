import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import defaultRegisterForm from '../../models/registerForm';
import RegisterForm from './registerForm';

const mockStore = configureStore();
const initialState = {
	registerForm: new defaultRegisterForm()
}
const store = mockStore(initialState);

describe('RegisterForm component', () => {
	beforeEach(() => {
		store.clearActions();
	})
	it('should render properly all inputs', () => {
		const wrapper = mount(<RegisterForm store={store} />);
		expect(wrapper.find('input')).toHaveLength(11);
	});
});
