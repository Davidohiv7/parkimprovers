import { SEARCH_ERROR_MESSAGE, SET_LOADING } from '../actions_types/home_actions_types'

const initialState = {
    loading: false,
    messages: {
        search_error: '',
    },
};

const homeReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SEARCH_ERROR_MESSAGE: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    search_error: action.payload,
                }
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload,
            }
        }
        default:
            return {...state}
    }
} 

export default homeReducer