import { GET_FAV  } from '../actions_types/favourites_actions_types'


export function getFavourite ( payload )  {
    return {
        type: GET_FAV, 
        payload
    }
}