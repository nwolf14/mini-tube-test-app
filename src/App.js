import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { setLanguage } from 'redux-polyglot';

import Home from './views/home';
import About from './views/about';

import Navigation from './components/navigation';

import store from '../createStore';

const translation = require(`./locales/en`).default;
store.dispatch(setLanguage('en', translation));

const App = props => (
	<div>
		<Navigation/>

		<Switch>
			<Route path="/about" component={About} />
			<Route path="/" component={Home} />
			<Route component={Home}/>
		</Switch>
	</div>
);

export default App;