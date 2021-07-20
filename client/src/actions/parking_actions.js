import axios from 'axios';

import { SEARCH_PARKING, SEARCH_PARKING_NO_RESULTS } from '../actions_types/parking_actions_types'

import { searchErrorMessage, setLoading } from '../actions/home_actions'


const apiURL = process.env.REACT_APP_API_URL

export const searchParkings = ( searched_location ) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(apiURL + "/parkings", { 
                params: {
                    searched_location
                }
            })
            dispatch({type: SEARCH_PARKING, payload: response.data});
            dispatch(setLoading(false));
        } catch (error) {
            dispatch({type: SEARCH_PARKING_NO_RESULTS});
            const message = error.response?.data.message
            if(message) {
                dispatch(searchErrorMessage(message));
            }
            if(!message) {
                dispatch(searchErrorMessage('Sorry we couldn`t connect to the server'));
            }
            dispatch(setLoading(false));
        }
    }
}