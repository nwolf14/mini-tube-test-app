import {ActionTypes} from '../common/constants';
import _ from 'lodash';

import {MOVIE_DETAILS_PARAMS} from '../common/constants';

export default function movieDetails(state = {}, action) {
  const newState = _.cloneDeep(state);

  switch(action.type) {
    case ActionTypes.POPULATE_MOVIE_DETAILS:
      const { Genre, Actors } = action.payload;

      return {  
        ...action.payload, 
        [MOVIE_DETAILS_PARAMS.GENRE]: Genre.split(','), 
        [MOVIE_DETAILS_PARAMS.ACTORS]: Actors.split(',')
      }
      
    default:
      return {...newState};
  }
}