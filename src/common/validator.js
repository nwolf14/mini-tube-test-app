import v from 'validator';
import _ from 'lodash';

import { getTranslations, chooseInputValidationSchema } from '../common/helpers';

const T = getTranslations('forms.messages');


export default class validator {
	static patterns = {
		name: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
		address: /^\D+(,?\s[A-z0-9]+)+$/i,
		city: /^[a-zA-Z]+(?:[\s-,][a-zA-Z]+)*$/i,
		zipCode: /^\d{1,2}(?:[-\s]\d{2,3})?$/i,
		password: /^[-\w\.\$@\*\!]{4,30}$/i,
		phone: /(\(?(\+[0-9]{2,3})\)?)?([ .-]?)([0-9]{3})\2([0-9]{4})/i,
		recaptcha: /^.+$/
	}

	static validateForm(form) {
		const validatedForm = _.cloneDeep(form);

		_.map(validatedForm, (input, inputName) => {
			validatedForm[inputName] = chooseInputValidationSchema(input, inputName, validatedForm);
		});

		return validatedForm;
	}

	static validateInputByPattern(input) {
		let isValidValue;
		input.value = v.escape(v.ltrim(input.value));

		if (input.validation.pattern) {
			isValidValue = input.value.match(input.validation.pattern);
		} else {
			isValidValue = true;
		}
		return returnInputAfterValidation(input, isValidValue);
	};

	static validateEmail(input) {
		input.value = v.escape(v.ltrim(input.value));
		const isValidValue = v.isEmail(input.value);
		return returnInputAfterValidation(input, isValidValue);
	}

	static validatePhoneNumber(input) {
		input.value = v.escape(v.ltrim(input.value));
		const isValidValue = v.isMobilePhone(input.value);
		return returnInputAfterValidation(input, isValidValue);
	}

	static areFieldsEqual(input, secondInput) {
		input.value = v.escape(v.trim(input.value));

		if (input.value !== secondInput.value) {
			return serializeInput(input, false, input.validation.message.notEqual);
		}

		if (input.value.match(input.validation.pattern)) {
			secondInput.errorMsg = null;
			secondInput.isValid = true;

			return serializeInput(input, true, null);

		} else {
			return serializeInput(input, false, input.validation.message.wrongPattern);
		}
	}

	static validateCheckbox(input) {
		const isValidValue = input.value;
		return returnInputAfterValidation(input, isValidValue);
	}



}

const returnInputAfterValidation = function(input, isValid = true) {
	if (input.required && _.isEmpty(input.value)) {
		return serializeInput(input, false, T.isRequired);
	}

	if (isValid) {
		return serializeInput(input, isValid, null);
	} else {
		return serializeInput(input, false, input.validation.message);
	}
}

const serializeInput = function(input = {}, isValid = false, errorMsg = null) {
	return {
		...input,
		isValid,
		errorMsg
	}; 
}