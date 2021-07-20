import { SEARCH_PARKING } from '../actions_types/parking_actions_types'
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL

export const searchParkings = ( searched_location ) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(apiURL + "/parkings", { 
                params: {
                    searched_location
                }
            })
            console.log(response.data)
            dispatch({type: SEARCH_PARKING, payload: response.data});
        } catch (error) {
            console.log(error)
        }
    }
}