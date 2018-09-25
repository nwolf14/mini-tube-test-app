import { createInputstructure, getTranslations } from '../common/helpers';
import { inputTypes } from '../common/constants'

const T = getTranslations('forms');

const loginForm = {};
loginForm[inputTypes.EMAIL] = createInputstructure('email', T.labels.email, {}, true);
loginForm[inputTypes.PASSWORD] = createInputstructure('password', T.labels.password, {}, true);

export default loginForm;
