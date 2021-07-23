import React from 'react';
//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { getFavourite } from '../../../actions/favourites_actions'

import ReactPaginate from "react-paginate";


import './FavouritesPagination.css';
import './FavouritesPaginationMobile.css';

import { getFavouritesLocal } from '../../../utils/functions/favourites'


export default function FavouritesPagination( ) {

    const dispatch = useDispatch();
    const favouritesStoreData = useSelector((state) => (state.favouritesReducer ))

    function pageChangeHandler(page) {

        const favourites = getFavouritesLocal( {
            ...favouritesStoreData,
            page: page.selected,
        })
        
        dispatch(getFavourite(favourites))
    }



    return (
        <ReactPaginate
            containerClassName='favp_pagination_container'
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            forcePage={favouritesStoreData.page}
            pageCount={favouritesStoreData.total_pages}
            onPageChange={pageChangeHandler}
            activeClassName={'active_page'}
            previousClassName={'next_prev'}
            nextClassName={'next_prev'}
            disabledClassName={'disabled_button'}
        />
    )
};