
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18n } from 'react-polyglot';

import createStoreWithMiddlewares from './createStore';
import App from './src/App';

const store = createStoreWithMiddlewares(window.initialData);
const locale = window.locale || 'en';
const messages = {
	"hello_name": "Hello, %{name}.",
	"num_cars": "%{smart_count} car |||| %{smart_count} cars",
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<I18n locale={locale} messages={messages}>
				<App />
			</I18n>
		</Provider>
	</BrowserRouter>,
	document.getElementById('app')
);