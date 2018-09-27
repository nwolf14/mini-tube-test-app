
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './createStore';
import { getConfig } from './src/common/helpers';

import App from './src/App';

const BASE_PATH = getConfig('BASE_PATH');

ReactDOM.render(
	<BrowserRouter basename={BASE_PATH}>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('app')
);