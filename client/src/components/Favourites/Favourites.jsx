import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Favourites.css';
import './FavouritesMobile.css';
//Custom functions
import { getFavouritesLocal } from '../../utils/functions/favourites'
//Components
import FavouritesPagination from './FavouritesPagination/FavouritesPagination'
import FavouritesSearchBar from './FavouritesSearchBar/FavouritesSearchBar'
import FavouritesFilters from './FavouritesFilters/FavouritesFilters'
import FavouriteCard from './FavouriteCard/FavouriteCard'
//Actions
import { getFavourite } from '../../actions/favourites_actions'

export default function Favourites() {

    const dispatch = useDispatch();

    const favouritesStoreData = useSelector((state) => (state.favouritesReducer ))

    useEffect(
        () => {
            const favourites = getFavouritesLocal(favouritesStoreData)
            if(favourites) {
                dispatch(getFavourite(favourites))
            }
        },
    // eslint-disable-next-line
    []);

    return (
        <div className='fav_container'>
            <div className='fav_left_container'>
                <span>Favourties parkings: </span> 
                <FavouritesSearchBar/>
                <FavouritesFilters/>
            </div>
            <div className='fav_right_container'>
                <FavouritesPagination/>
                {
                    favouritesStoreData.toShow.length > 0 ?
                    favouritesStoreData.toShow.map(parking => {
                        return (
                            <FavouriteCard key={`${parking.name}`} parking={parking}/>
                        )
                    }) :
                    <div> No favourties found </div>
                }
            </div>
        </div>
    );
};