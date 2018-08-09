import { combineReducers } from 'redux';
import { polyglotReducer } from 'redux-polyglot';

import addMovieForm from './addMovieForm';
import movieDetails from './movieDetails';

export default combineReducers({
	polyglot: polyglotReducer,
	addMovieForm,
	movieDetails	
});
