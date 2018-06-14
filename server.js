import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import bodyParser from 'body-parser';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import express from 'express';
import { StaticRouter } from 'react-router';

//import apiRouter from './api';
import reducers from './src/reducers';
import App from './src/App';

const config = require('config');
const server = express();

server.use(bodyParser.json());
server.use(sassMiddleware({
	src: path.join(__dirname, 'assets/sass'),
	dest: path.join(__dirname, 'public')
}));
// server.use('/api', apiRouter);
server.use(express.static('public'));

//
server.set('view engine', 'ejs');
//

server.get('*', (req, res) => {
	const initialData = { initialText: "rendered on the server" };
	const store = createStore(reducers, initialData);
	const context = {};
	const initialMarkup = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<Provider store={store}>
				<App />
			</Provider>
		</StaticRouter>
	);

	res.render('index', {
		initialMarkup,
		initialData
	});
});

server.listen(config.port, config.host, () => {
	console.info('Express listening on ', `${config.host}:${config.port}`);
});
