import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import parkingsReducer from './parkingsReducer';
import favouritesReducer from './favouritesReducer';

const reducer = combineReducers({ homeReducer, parkingsReducer, favouritesReducer });

export default reducer;