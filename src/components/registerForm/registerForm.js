import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Modal from '../modal/modal';

import { processForm, storeInputChange, resetForm, mapErrorsFromResponse } from '../../actions/registerForm';
import { handleChange, getTranslations, setFocusOnFirstFormElement } from '../../common/helpers';
import createInputs from '../formInput/formInput';
import defaultRegisterForm from '../../models/registerForm';
import { inputTypes } from '../../common/constants';


class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = handleChange.bind(this);
        this.registerForm = React.createRef();
        this.state = {
            showModal: false,
            modalContent: '',
            isRegistrationFinished: false
        };
    }

    componentDidMount() {
        //setFocusOnFirstFormElement(this.registerForm.current);
    }

    render() {
        const T = getTranslations();
        const recaptchaHandler = this.handleRecaptcha;
        const formCustomOptions = {
            [inputTypes.RECAPTCHA]: {
                recaptchaHandler
            }
        }
        const { registerForm } = this.props;
        const registerFormInputs = createInputs(new defaultRegisterForm(), registerForm, this.handleChange, formCustomOptions);

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="register-form" ref={this.registerForm}>
                    {registerFormInputs}
                    <button type="submit" className="btn btn-primary">{T.buttons.register}</button>
                </form>
                <Modal
                    showModal={this.state.showModal}
                    toggleModal={this.handleModal}
                    modalTitle="Information:"
                >{this.state.modalContent}</Modal>
            </div>
        );
    };

    handleRecaptcha = (e = '') => {
        const inputName = inputTypes.RECAPTCHA;

        this.props.storeInputChange({
            inputName,
            value: e
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.processForm(this.registerForm.current.elements, this.signupCallback);        
    }

    handleModal = () => {
        this.setState(previousState => ({
            ...previousState,
            showModal: !previousState.showModal
        }));

        this.isRegistrationFinished();
    }

    signupCallback = response => {
        const modifyState = {};
        const errors = _.get(response, 'errors');
        if (!errors) {
            modifyState.modalContent = <h3>Success! Please verify email and then login.</h3>;
            modifyState.isRegistrationFinished = true;
            this.setState(prevState => ({
                ...prevState,
                ...modifyState,
                showModal: !prevState.showModal,
            }));
        } else if (errors) {
            this.props.mapErrorsFromResponse(response.errors, this.registerForm.current);
        }
    }

    isRegistrationFinished() {
        if (this.state.isRegistrationFinished) {
            ReactDOM.findDOMNode(this).dispatchEvent(new CustomEvent("registrationSuccess", { bubbles: true }));
            this.props.resetForm();
        }
    }
    
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        processForm,
        storeInputChange,
        resetForm,
        mapErrorsFromResponse
    }, dispatch)
}


function mapStateToProps(state) {
    const { registerForm } = state;

    return {
        registerForm
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
