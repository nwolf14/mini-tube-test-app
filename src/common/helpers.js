import React from 'react';
import _ from 'lodash';

import { inputTypes} from './constants';

const lang = typeof window !== "undefined" ? localStorage.getItem('lang') : null;
const translations = require(`../locales/${lang ? lang : 'en'}`).default;
export function getTranslations(path) {
	if (path) return _.get(translations, path);

	return translations;
}

export function getConfig(path) {
	let enviroment = process.env.NODE_ENV;

	if (enviroment === 'test') {
		enviroment = 'development';
	}
	const config = require(`../config/${enviroment}`).default;

	if (path) {
		return _.get(config, path);
	}
	return config;
}


// *************************** METHODS FOR FORMS

export function handleChange(e) {
	const inputName = e.target.name;
	let value;

	if (e.target.type === "checkbox") {
		value = e.target.checked;
	} else if (e.target.hasAttribute('multiple')) {
		value = Array.from(e.target.selectedOptions).map(item => item.value).join(", ");
	} else {
		value = e.target.value;
	}

	this.props.storeInputChange({
		inputName,
		value
	});
}

export function handleSubmit(e) {
	e.preventDefault();
	if (this.toggleModal) {
		this.props.processForm(this.toggleModal);
	} else {
		this.props.processForm();
	}
}

export function hasInputsWithErrors(inputsWithErrors = [], formElements = {}) {
	if (inputsWithErrors.length > 0) {
		const inputName = _.get(_.first(inputsWithErrors), 'name', '');
		const input = _.get(formElements, inputName);
		console.log('inputsWithErrors: ', inputsWithErrors);
		if (input) {
			input.focus();
		}
		return true;
	}

	return false;
}

export function renderResponseErrors(errors) {
	return (
		<div>
			<h3 className="error">Errors:</h3>
			{_.map(errors, (error, key) => {
				return (
					<p key={key}>
						{key}: {error}
					</p>
				);
			})}
		</div>
	);
}

export function setFocusOnFirstFormElement(formElements) {
	formElements[0].focus();
}

export function mapFormValuesForRequest(form) {
	const mappedForm = {};
	for (let prop in form) {
		mappedForm[prop] = form[prop].value;
	}
	return mappedForm;
}

export function chooseInputValidationSchema(input = {}, inputName = '', form = {}) {
	let validatedInput;

	if (input.validation) {
        if (inputName === inputTypes.PASSWORD) {
        	validatedInput = input.validation.validator(input, form[inputTypes.REPEAT_PASSWORD]);
        } else if (inputName === inputTypes.REPEAT_PASSWORD) {
        	validatedInput = input.validation.validator(input, form[inputTypes.PASSWORD]);
        } else {
        	validatedInput = input.validation.validator(input);
        }
	}
	
	return validatedInput;
}

export function createInputstructure(type, label, extraProps = {}, required = false, name = '') {
	return {
		type,
		label,
		value: '',
		...extraProps,
		required,
		touched: false,
		isValid: false,
		errorMsg: null,
		name
	}
}


// *********************** MODALS

export function toggleModal() {
	this.setState(previousState => ({
		...previousState,
		showModal: !previousState.showModal
	}));
}