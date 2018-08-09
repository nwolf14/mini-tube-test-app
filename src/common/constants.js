import keyMirror from 'keymirror';
import moment from 'moment';

const ActionTypes = keyMirror({
  VALIDATE_FORM: null,
  PROCESS_FORM_DATA: null,
  GET_STORED_MOVIES: null,
  FETCH_MOVIES: null,
  FETCH_MOVIE_DETAILS: null,
  FETCH_WIKI_DATA: null,
  POPULATE_MOVIES: null,
  POPULATE_MOVIE_DETAILS: null,
  POPULATE_WIKI_DATA: null,
  GO_BACK: null,
  GO_TO: null,
  PROCESS_INPUT_CHANGE: null,
  RESET_FORM: null,
  SET_FORM_PROPERTY_VALUE: null,
  SAVE_MOVIE: null,
});

const API_PARAMS = {
  SEARCH: 's',
  ID: 'i'
};

const WIKI_API_PARAMS = {
  SEARCH: 'search'
};

const MOVIE_DETAILS_PARAMS = {
  TITLE: 'Title',
  YEAR: 'Year',
  PRODUCTION: 'Production',
  ID: 'imdbID',
  RELEASED: 'Released',
  RUNTIME: 'Runtime',
  COUNTRY: 'Country',
  POSTER: 'Poster',
  LANGUAGE: 'Language',
  DIRECTOR: 'Director',
  WRITER: 'Writer',
  ACTORS: 'Actors',
  PLOT: 'Plot',
  GENRE: 'Genre',
  RATED: 'Rated',
  IMBD_RATING: 'imdbRating',
  IMDB_VOTES: 'imdbVotes',
  RATINGS: 'Ratings',
  METASCORE: 'Metascore',
  AWARDS: 'Awards',
  BOX_OFFICE: 'BoxOffice',
  DVD: 'DVD',
  WEBSITE: 'Website'
}

export function createInputStructure(type, label, extraProps = {}, required = false) {
  return {
    type,
    label,
    value: '',
    ...extraProps,
    required,
    touched: false,
    isValid: false,
    errorMsg: ''
  }
}


export { ActionTypes, API_PARAMS, WIKI_API_PARAMS, MOVIE_DETAILS_PARAMS };