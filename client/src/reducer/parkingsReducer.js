import { SEARCH_PARKING } from '../actions_types/parking_actions_types'

const initialState = {
    parkings: [],
    total_pages: null,
    page: null,
    location: null
};

const parkingsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SEARCH_PARKING: {
            return {
                ...state,
                parkings: action.payload.parkings,
                total_pages: action.payload.pages,
                page: 1,
                location: action.payload.searched_location
            }
        }
        default:
            return {...state}
    }
} 

export default parkingsReducer