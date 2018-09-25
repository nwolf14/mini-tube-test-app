import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Recaptcha from '../recaptcha/recaptcha';


export default function createInputs(formStructure, formData, handleChange, options = {}) {
	return _.map(formStructure, (input, inputName) => {
		if (options[inputName]) {
			return <CreateInputByType
				inputElement={input}
				inputName={inputName}
				form={formData}
				handler={handleChange}
				key={inputName}
				options={options[inputName]}/>
		}

		return <CreateInputByType
			inputElement={input}
			inputName={inputName}
			form={formData}
			handler={handleChange}
			key={inputName}
			options={{}} />
	});
}

class CreateInputByType extends Component {
	render() {
		const {
			inputElement,
			inputName,
			form,
			handler,
			options 
		} = this.props;
		let input;

		switch (inputElement.type) {
			case 'select':
				input = (
					<select
						className={inputElement.inputClassName || 'form-control'}
						name={inputName}
						multiple={inputElement.multiple}
						onChange={handler}
						required={inputElement.required}
						{...options}>
						{inputElement.options.map(option => <option value={option.name} key={option.name}>{option.name}</option>)}
					</select>
				);
				break;
			case 'textarea':
				input = (
					<textarea
						className={inputElement.inputClassName || 'form-control'}
						name={inputName}
						placeholder={inputElement.placeholder}
						value={form[inputName].value}
						onChange={handler}
						required={inputElement.required}
						{...options}>
					</textarea>
				);
				break;
			case 'number':
				input = (
					<input
						className={inputElement.inputClassName || 'form-control'}
						type={inputElement.type}
						name={inputName}
						placeholder={inputElement.placeholder}
						value={form[inputName].value}
						onChange={handler}
						required={inputElement.required}
						min={inputElement.min}
						max={inputElement.max} 
						{...options} />
				);
				break;
			case 'recaptcha':
				input = (
					<Recaptcha
						handler={handler}
						{...options}
					/>
				);
				break;
			default:
				input = (
					<input
						className={inputElement.inputClassName || 'form-control'}
						type={inputElement.type}
						name={inputName}
						placeholder={inputElement.placeholder}
						value={form[inputName].value}
						onChange={handler}
						required={inputElement.required}
						{...options} />
				);
		}

		return (
			<div className={inputElement.wrapperClassName || 'form-group'}>
				<label>{inputElement.label}</label>
				{input}
				<small className={inputElement.errorClassName || 'error'}>{form[inputName].errorMsg}</small>
			</div>
		);
	}
}

CreateInputByType.propTypes = {
	inputElement: PropTypes.object.isRequired,
	inputName: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
	handler: PropTypes.func.isRequired
}