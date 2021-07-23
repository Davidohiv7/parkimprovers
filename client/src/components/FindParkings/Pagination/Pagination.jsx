import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import ReactPaginate from "react-paginate";
import {changePage} from '../../../actions/parking_actions'

import './Pagination.css';
import './PaginationMobile.css';



export default function Pagination( ) {

    const dispatch = useDispatch();
    const { total_pages, searched_location, page } = useSelector((state) => ({ ...state.parkingsReducer }))


    function pageChangeHandler(page) {
        dispatch(changePage(searched_location, page.selected))
    }



    return (
        <ReactPaginate
            containerClassName='Pagination_container'
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            pageCount={total_pages}
            onPageChange={pageChangeHandler}
            activeClassName={'active_page'}
            previousClassName={'next_prev'}
            nextClassName={'next_prev'}
            disabledClassName={'disabled_button'}
            forcePage={page}
        />
    );
};