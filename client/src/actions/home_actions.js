import { SEARCH_ERROR_MESSAGE, SET_LOADING } from '../actions_types/home_actions_types'



export const searchErrorMessage = ( message ) => {
    return {
        type: SEARCH_ERROR_MESSAGE, 
        payload: message
    }
}

export const setLoading = ( bool ) => {
    return {
        type: SET_LOADING, 
        payload: bool
    }
}