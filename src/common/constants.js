const ActionTypes = {
  PROCESS_REGISTER_FORM: 'PROCESS_REGISTER_FORM',
  REGISTER_USER: 'REGISTER_USER',
  RESET_REGISTER_FORM: 'RESET_FORM',
  SET_REGISTER_FORM_PROPERTY_VALUE: 'SET_FORM_PROPERTY_VALUE',
  VALIDATE_REGISTER_FORM: 'VALIDATE_REGISTER_FORM',
  PUT_USER: 'PUT_USER',
  VALIDATE_USER: 'VALIDATE_USER',
  MAP_REGISTER_ERRORS_FROM_RESPONSE: 'MAP_REGISTER_ERRORS_FROM_RESPONSE'
};

const inputTypes = {
  LOGIN: 'login',
	FIRST_NAME: 'firstName',
	LAST_NAME: 'lastName',
	EMAIL: 'email',
  PASSWORD: 'password',
  REPEAT_PASSWORD: 'repeatPassword',
	PHONE: 'phone',
	CITY: 'city',
	ADDRESS: 'address',
	ZIP_CODE: 'zip_code',
  COUNTRY: 'country',
  RECAPTCHA: 'g-recaptcha-response',
  GDPR_AGREEMENT: 'is_gdpr_accepted'
}

const routes = {
  HOME: '/',
  LOGIN: '/login',
}

const apiRoutes = {
  SIGN_UP: "/api/users",
  SIGN_IN: "/api/users/login",
  VALIDATE_TOKEN: "/api/users",
}

const LANG_PL = 'pl';
const LANG_EN = 'en';

export { 
  ActionTypes,
  apiRoutes,
  LANG_PL, 
  LANG_EN,
  inputTypes,
  routes
};