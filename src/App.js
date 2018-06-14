import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Home from './components/home';
import About from './components/about';

const App = (props) => (
	<div>
		<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/about">About</Link></li>
		</ul>

		<hr />

		<Switch>
			<Route path="/about" component={About} />
			<Route path="/" component={Home} />
		</Switch>
	</div>
);

export default App;