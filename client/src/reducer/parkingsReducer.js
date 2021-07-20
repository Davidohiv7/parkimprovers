import { SEARCH_PARKING, SEARCH_PARKING_NO_RESULTS, CHANGE_PAGE } from '../actions_types/parking_actions_types'

const initialState = {
    parkings: [],
    page: null, 
    total_pages: null,
    locations: null,
    searched_location: null,
};

const parkingsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SEARCH_PARKING: {
            return {
                ...state,
                parkings: action.payload.parkings,
                page: action.payload.page,
                total_pages: action.payload.pages,
                locations: action.payload.locations,
                searched_location: action.payload.searched_location,
            }
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                parkings: action.payload.parkings,
                page: action.payload.page,
                total_pages: action.payload.pages,
                locations: action.payload.locations,
                searched_location: action.payload.searched_location,
            }
        }
        case SEARCH_PARKING_NO_RESULTS: {
            return {
                ...state,
                parkings: [],
                total_pages: null,
                locations: null,
                searched_location: null,
            }
        }
        default:
            return {...state}
    }
} 

export default parkingsReducer