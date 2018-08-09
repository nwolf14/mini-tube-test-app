import _ from 'lodash';
import moment from 'moment';

export default class validator {
	static isDateBeforeNow(input) {
		const validatedInput = {};
		validatedInput.errorMsg = '';
		validatedInput.isValid = moment(input.value).isBefore(moment());

		if (!validatedInput.isValid) {
			validatedInput.errorMsg = `Please select a date from the past.`;
		}
		
		return {...input, ...validatedInput};
	}

	static validateByInputType(input, inputType) {
		switch (inputType) {
			case 'date':
				if (input.value && input.dateBeforeNow) {
					return validator.isDateBeforeNow(input);
				} else {
					return {
						...input,
						isValid: true,
						errorMsg: ''
					};
				}
			default:
                return {
					...input,
                    isValid: true,
                    errorMsg: ''
                };
		}
	}

	static validateInput(input) {
		const {type, required, value} = input;
		
		if (required && _.isEmpty(value)) {
			return {
				...input,
                isValid: false,
                errorMsg: 'Value is required'
			};
		}
		
		return validator.validateByInputType(input, type);
	}

	static validateForm(form) {
		const newForm = _.cloneDeep(form);

		_.map(newForm, (input, key) => {
			newForm[key] = validator.validateInput(input);
		});

		return newForm;
	}
}