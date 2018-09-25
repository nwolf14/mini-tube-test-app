import { createInputstructure, getTranslations } from '../common/helpers';
import { inputTypes } from '../common/constants'
import validator from '../common/validator';


function registerFormModel() {
	const T = getTranslations('forms');
	const form = {};
	form[inputTypes.EMAIL] = createInputstructure('email', T.labels.email, { 
		validation: {
			validator: validator.validateEmail,
			message: T.messages.email
		}
	}, true, inputTypes.EMAIL);
	form[inputTypes.PASSWORD] = createInputstructure('password', T.labels.password, {
		validation: {
			pattern: validator.patterns.password,
			validator: validator.areFieldsEqual,
			message: {
				notEqual: T.messages.passwordsNotEqual,
				wrongPattern: T.messages.password
			}
		}
	}, true, inputTypes.PASSWORD);
	form[inputTypes.REPEAT_PASSWORD] = createInputstructure('password', T.labels.repeatPassword, {
		validation: {
			pattern: validator.patterns.password,
			validator: validator.areFieldsEqual,
			message: {
				notEqual: T.messages.passwordsNotEqual,
				wrongPattern: T.messages.password
			}
		}
	}, true, inputTypes.REPEAT_PASSWORD);
	form[inputTypes.FIRST_NAME] = createInputstructure('text', T.labels.firstName, {
		validation: {
			pattern: validator.patterns.name,
			validator: validator.validateInputByPattern,
			message: T.messages.firstName
		}
	}, true, inputTypes.FIRST_NAME);
	form[inputTypes.LAST_NAME] = createInputstructure('text', T.labels.lastName, {
		validation: {
			pattern: validator.patterns.name,
			validator: validator.validateInputByPattern,
			message: T.messages.lastName
		}
	}, true, inputTypes.LAST_NAME);
	
	form[inputTypes.PHONE] = createInputstructure('text', T.labels.phone, {
		validation: {
			pattern: validator.patterns.phone,
			validator: validator.validateInputByPattern,
			message: T.messages.phone
		}
	}, true, inputTypes.PHONE);
	form[inputTypes.ADDRESS] = createInputstructure('text', T.labels.address, {
		validation: {
			pattern: validator.patterns.address,
			validator: validator.validateInputByPattern,
			message: T.messages.address
		}
	}, true, inputTypes.ADDRESS);
	form[inputTypes.CITY] = createInputstructure('text', T.labels.city, {
		validation: {
			pattern: validator.patterns.city,
			validator: validator.validateInputByPattern,
			message: T.messages.city
		}
	}, true, inputTypes.CITY);
	form[inputTypes.ZIP_CODE] = createInputstructure('text', T.labels.zipCode, {
		validation: {
			pattern: validator.patterns.zipCode,
			validator: validator.validateInputByPattern,
			message: T.messages.zipCode
		}
	}, true, inputTypes.ZIP_CODE);
	form[inputTypes.GDPR_AGREEMENT] = createInputstructure('checkbox', T.labels.gdprAgreement, {
		validation: {
			validator: validator.validateCheckbox,
			message: T.messages.gdprAgreement
		}
	}, undefined, inputTypes.GDPR_AGREEMENT);
	form[inputTypes.RECAPTCHA] = createInputstructure('recaptcha', T.labels.recaptcha, {
		validation: {
			pattern: validator.patterns.recaptcha,
			validator: validator.validateInputByPattern,
			message: T.messages.recaptcha
		}
	}, undefined, inputTypes.RECAPTCHA);	

	return form;
}

export default registerFormModel;
