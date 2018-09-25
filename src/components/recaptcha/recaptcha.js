import React, { Component } from 'react';
import { getConfig } from '../../common/helpers';

const googleRecaptchaApiKey = getConfig('GOOGLE_RECAPTCHA');
const googleRecaptchaScriptUrl = getConfig('GOOGLE_RECAPTCHA_SCRIPT_URL');

export default class Recaptcha extends Component {
	constructor(props) {
		super(props);
		this.recaptchaWrapper = React.createRef();
	}

	appendGoogleCapchaScript() {
		const script = document.createElement("script");
		script.id = "googleRecaptcha";
		script.src = googleRecaptchaScriptUrl;
		script.async = true;

		this.recaptchaWrapper.current.appendChild(script);
		window.customRecaptchaValidationCallback = this.props.recaptchaHandler;
		window.customRecaptchaExpiredCallback = this.props.recaptchaHandler;
	}

	cleanGoogleRecaptchaFromWindowObject() {
		delete window.customRecaptchaValidationCallback;
		delete window.customRecaptchaExpiredCallback;
	}

	componentDidMount() {
		this.appendGoogleCapchaScript();
	}

	componentWillUnmount() {
		this.cleanGoogleRecaptchaFromWindowObject();
	}

	render() {
		return (
			<div className="recaptcha__wrapper form-group" ref={this.recaptchaWrapper}>
				<label>{this.props.label}</label>
				<div
					className="g-recaptcha"
					data-callback="customRecaptchaValidationCallback"
					data-sitekey={googleRecaptchaApiKey}
					data-expired-callback="customRecaptchaExpiredCallback"></div>
				<small className='error'>{this.props.errorMsg}</small>
				<input type="hidden" value="" />
			</div >
		);
	}
}