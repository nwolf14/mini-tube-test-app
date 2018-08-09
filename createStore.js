import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { createStore, applyMiddleware } from 'redux';
import { createPolyglotMiddleware } from 'redux-polyglot';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './src/reducers';
import rootSaga from './src/sagas';


export default initialData => {
	const polyglotMiddleware = createPolyglotMiddleware(
		['LANG_PL', 'LANG_EN'],
		action => action.payload.locale,
		locale => new Promise(resolve => {
			resolve(require(`./src/${locale}`));
		})
	);
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducers, initialData, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware, polyglotMiddleware)));
	
	sagaMiddleware.run(rootSaga);
	return store;
}
