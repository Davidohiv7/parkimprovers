import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import parkingsReducer from './parkingsReducer';

const reducer = combineReducers({ homeReducer, parkingsReducer });

export default reducer;