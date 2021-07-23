import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getFavourite } from '../../../actions/favourites_actions'

import './FavouritesSearchBar.css';
import './FavouritesSearchBarMobile.css';

import { getFavouritesLocal } from '../../../utils/functions/favourites'

export default function FavouritesSearchBar( ) {

    const dispatch = useDispatch();
    const favouritesStoreData = useSelector((state) => (state.favouritesReducer ))

    const handleInputChange = function(e) {

        const favourites = getFavouritesLocal( {
            ...favouritesStoreData,
            searchWord: e.target.value,
            page: 0,
        })

        dispatch(getFavourite(favourites))

    }


    return (
        <form className={`fav_sb_container`} >
            <input 
                type="text" 
                placeholder='Write a location...' 
                onChange={handleInputChange}
                value={favouritesStoreData.searchWord}
            />
        </form>
    )
};