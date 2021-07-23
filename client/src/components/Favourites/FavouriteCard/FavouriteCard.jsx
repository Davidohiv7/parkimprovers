import React from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getFavourite } from '../../../actions/favourites_actions'

import './FavouriteCard.css';
import './FavouriteCardMobile.css';

import no_image from '../../../utils/img/fav/no_image.png'

import { FiPhone } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';


import { deleteFavouriteLocal, getFavouritesLocal } from '../../../utils/functions/favourites'


export default function FavouriteCard( { parking } ) {

    const history = useHistory()

    const dispatch = useDispatch();
    const favouritesStoreData = useSelector((state) => (state.favouritesReducer ))

    function handleCardClick(e) {
        if(e.target.localName !== 'svg' && e.target.localName !== 'path') {
            history.push(`/favourites/${parking.id}`)
        }
    }

    function handleDeleteClick() {

        const newFavourites = deleteFavouriteLocal(parking)

        const veriyFilter = newFavourites.locations.filter(location => location.text === favouritesStoreData.filter)

        const page = newFavourites.total_pages - 1 > favouritesStoreData.page ? favouritesStoreData.page : newFavourites.total_pages - 1

        if(veriyFilter.length === 0) {
            const favourites = getFavouritesLocal( {
                ...favouritesStoreData,
                filter: '',
                page: page < 0 ? 0 : page
            })
            return dispatch(getFavourite(favourites))
        }

        let favourites = getFavouritesLocal( {
            ...favouritesStoreData,
            page
        })

        let pageFilter = favourites.total_pages - 1 > favouritesStoreData.page ? favouritesStoreData.page : favourites.total_pages - 1



        favourites = getFavouritesLocal( {
            ...favouritesStoreData,
            page: pageFilter < 0 ? 0 : pageFilter
        })

        dispatch(getFavourite(favourites))
    }

    return (
        <div className='fav_card_container' onClick={handleCardClick}>
            <div className='fav_card_left_container'>
                <img className='fav_card_picture' src={parking.photos[0] || no_image} alt={parking.name}/>
                <div className='fav_card_left_data_container'>
                    <span className='fav_card_name'>{parking.name}</span>
                    <span className='fav_card_city'>{parking.city}</span>
                    <span className='fav_card_city'>{parking.score}</span>
                </div>
            </div>
            <div className='fav_card_right_container'>
                
                <a href={`tel:${parking.phone}`}>
                    <FiPhone/>
                </a>

                <AiOutlineDelete onClick={handleDeleteClick}/>

            </div>
        </div>
    );
};