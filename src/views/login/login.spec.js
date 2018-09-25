import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Login from './login';

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('LoginView component', () => {
	it('should render properly all inputs for login form', () => {
		const wrapper = mount(<Login store={store}/>);
		expect(wrapper.find('input').length).toEqual(2);
	});
	it('should render register form after click on "sign up" button', () => {
		const wrapper = mount(<Login store={store}/>);
		const signUpButton = wrapper.find('button.login-form__sign-upp');
		console.log('asd', signUpButton);
		
		signUpButton.simulate('click');
		
		const loginState = wrapper.state();
		expect(loginState.showRegisterForm).toEqual(true);
	});
});
