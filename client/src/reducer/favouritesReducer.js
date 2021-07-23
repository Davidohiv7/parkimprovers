import { GET_FAV} from '../actions_types/favourites_actions_types'

const initialState = {
    parkings: [],
    locations: [],
    toShow: [],
    total_pages: 1,
    searchWord: '',
    filter: '',
    parameter: '',
    type: '',
    page: 0,
};

const favouritesReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_FAV: {
            return {
                ...state,
                locations: action.payload.locations,
                toShow: action.payload.toShow,
                total_pages: action.payload.total_pages,
                searchWord: action.payload.searchWord,
                filter: action.payload.filter,
                parameter: action.payload.parameter,
                type: action.payload.type,
                page: action.payload.page,
            }
        }
        default:
            return {...state}
    }
} 

export default favouritesReducer

