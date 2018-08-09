require('./api/helpers')
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import sassMiddleware from 'node-sass-middleware';
import passport from 'passport';
import logger from 'morgan';
import cors from 'cors';

import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import apiRoutes from './api/routes';
import App from './src/App';
import store from './createStore';

const config = require('config').node;
const server = express(); 

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cors());
server.use(passport.initialize());

server.use(sassMiddleware({
	src: path.join(__dirname, 'assets/sass'),
	dest: path.join(__dirname, 'public')
}));
server.use(express.static('public'));
server.use('/api', apiRoutes);
//
server.set('view engine', 'ejs');
//

server.get(/^(?!\/api.*).*/, (req, res) => {
	const locale = 'en';
	const messages = {
		"hello_name": "Hello, %{name}.",
		"num_cars": "%{smart_count} car |||| %{smart_count} cars",
	}
	
	const initialMarkup = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={{}}>
			<Provider store={store}>
				<App />
			</Provider>
		</StaticRouter>
	);

	res.render('index', {
		initialMarkup
	});
});

server.listen(config.port, config.host, () => {
	console.info('Express listening on ', `${config.host}:${config.port}`);
});