import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getFavourite } from '../../../actions/favourites_actions'
import './FavouritesFilters.css';
import './FavouritesFiltersMobile.css';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { getFavouritesLocal } from '../../../utils/functions/favourites'

export default function FavouritesFilters( ) {

    const dispatch = useDispatch();
    const favouritesStoreData = useSelector((state) => (state.favouritesReducer ))

    const [dropDownState, setDropDownState] = useState({
        sortby: false
    });

    function handleClick(e) {
        setDropDownState({
            ...dropDownState,
            [e.currentTarget.id]: !dropDownState[e.currentTarget.id]
        })
    }

    function handleFilterSort(parameter, type, name) {
        if(parameter) {
            
            const favourites = getFavouritesLocal( {
                ...favouritesStoreData,
                parameter,
                type,
            })
            
            dispatch(getFavourite(favourites))

        }else{
            const favourites = getFavouritesLocal( {
                ...favouritesStoreData,
                filter: name === 'All locations' ? '' : name,
                page: 0,
            })
            
            dispatch(getFavourite(favourites))

        }
    }

    const filterParameters = [
        {
            id: 'sortby',
            name: 'Sort By',
            options: [
                {
                    text: 'A - Z',
                    parameter: 'name',
                    type: 'asc',
                },
                {
                    text: 'Z - A',
                    parameter: 'name',
                    type: 'desc',
                },
                {
                    text: 'Newest',
                    parameter: 'date',
                    type: 'desc',
                },
                {
                    text: 'Oldest',
                    parameter: 'date',
                    type: 'asc',
                },
                {
                    text: 'Higher score',
                    parameter: 'score',
                    type: 'desc',
                },
                {
                    text: 'Lower Score',
                    parameter: 'score',
                    type: 'asc',
                },
            ]
        },
        {
            id: 'filter',
            name: 'Locations',
            options: [{text: 'All locations', lower: 'all locations'}, ...favouritesStoreData.locations]
        }
    ]

    return (
        <div className='filters_container'>
            {
                filterParameters.map(filter => {
                    return (
                        <div key={`${filter.id}`} className='filters_sort_container'>
                            <div onClick={handleClick} className='filters_sort_title' id={filter.id}>
                                <span>{filter.name}</span>
                                {
                                    dropDownState[filter.id] ?
                                    <IoIosArrowDown/> :
                                    <IoIosArrowUp/>
                                }
                            </div>
                                {
                                    dropDownState[filter.id] ?
                                    <ul className='filters_sort_options'>
                                        {
                                            filter.options.map((option, i) => {
                                                return (
                                                    <li className={option.text === favouritesStoreData.filter || (option.parameter === favouritesStoreData.parameter && option.type === favouritesStoreData.type) ? 'filters_sort_options_selected' : undefined} key={`${option.text}_i`} onClick={() => handleFilterSort(option.parameter, option.type, option.text)} >{`${option.text}`}</li>
                                                )
                                            })
                                        }
                                    </ul>             
                                    :
                                    undefined
                                }
                            <hr className='filter_line'/>
                        </div>
                    )
                })
            }
            
        </div> 
    )
};