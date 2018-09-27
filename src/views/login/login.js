import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
//import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import createInputs from '../../components/formInput/formInput';
import RegisterForm from '../../components/registerForm/registerForm';

import { checkIfUserExists } from '../../actions/user';
import defaultLoginForm from '../../models/loginForm';
import { getTranslations, setFocusOnFirstFormElement, mapFormValuesForRequest } from '../../common/helpers';
import { apiRoutes } from '../../common/constants';
import apiClient from '../../common/apiClient/serverApi';

// const RegisterForm = Loadable({
// 	loader: () => import('../../components/registerForm/registerForm'),
// 	loading: () => <div>Loading...</div>
// })


class LoginView extends Component {
	constructor(props) {
		super(props);
		this.loginForm = React.createRef();
		this.state = {
			showRegisterForm: false,
			loginForm: defaultLoginForm,
			loginErrorMessage: ''
		}
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).addEventListener('registrationSuccess', this.toggleRegisterForm);
		//setFocusOnFirstFormElement(this.loginForm.current);
	}

	componentWillUnmount() {
		ReactDOM.findDOMNode(this).removeEventListener('registrationSuccess',  this.toggleRegisterForm);
	}

	render() {
		const T = getTranslations('buttons');
		const loginFormInputs = createInputs(defaultLoginForm, this.state.loginForm, this.handleChange);

		return (
			<section className="login-view">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<form onSubmit={this.handleSubmit} className="login-form" ref={this.loginForm}>
								{loginFormInputs}
								<small className="error">{this.state.loginErrorMessage}</small>
								<button type="submit" className="btn btn-success">{T.login}</button>
							</form>
							<button className="btn btn-primary login-form__sign-up" onClick={this.toggleRegisterForm}>{T.signup}</button>
							{this.state.showRegisterForm && <RegisterForm />}
						</div>
					</div>
				</div>
			</section>
		);
	};

	handleChange = e => {
		const inputName = e.target.name;
		const loginForm = _.cloneDeep(this.state.loginForm);
		loginForm[inputName].value = e.target.value;

		this.setState(previousState => ({
			...previousState,
			loginForm
		}));
	}

	handleSubmit = e => {
		e.preventDefault();
		const mappedForm = mapFormValuesForRequest(this.state.loginForm);

		new Promise(resolve => {
			resolve(apiClient.post(apiRoutes.SIGN_IN, mappedForm));
		})
		.then((response = {}) => {
			if(response.success) {
				localStorage.setItem("token", response.token);
				this.props.checkIfUserExists();
				this.props.history.push('/');
			} else {
				this.setState(prevState => ({
					...prevState,
					loginErrorMessage: 'Invalid credentials'
				}));
				setFocusOnFirstFormElement(this.loginForm.current);
			}
		});
	}

	toggleRegisterForm = e => {		
		if(this.state.showRegisterForm) {
			setFocusOnFirstFormElement(this.loginForm.current);
		}
		this.setState(previousState => ({
			...previousState,
			showRegisterForm: !previousState.showRegisterForm
		}));
	}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		checkIfUserExists
    }, dispatch)
}

export default connect(undefined, mapDispatchToProps)(LoginView);
