import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Home from './views/home';
import About from './views/about';

import Navigation from './components/navigation';

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