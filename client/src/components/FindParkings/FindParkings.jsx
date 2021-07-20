import React from 'react';
import { useSelector } from 'react-redux'

import './FindParkings.css';

import SearchBar from '../SearchBar/SearchBar'
import ParkingCards from './ParkingCards/ParkingCards'
import Loader from '../Loader/Loader'
import Pagination from './Pagination/Pagination'

export default function FindParkings( ) {

    const { loading } = useSelector((state) => ({ ...state.homeReducer }))
    const { parkings, locations } = useSelector((state) => ({ ...state.parkingsReducer }))

    return (
        <div className='fp_container'>
            <div className='fp_header_container'>
                <div>
                    <span>Find parking lots worldwide:</span>
                    <SearchBar className='fp_searchbar'/>
                </div>
            </div>

            {
                loading ? 
                <Loader size={100} color={'#F8C342'} margin={'10rem 0rem 0rem 0rem'}/> :
                parkings.length > 0 ?
                <div className='fp_content_container'>

                <div className='fp_location_pagination_container'>
                    <div className='fp_location_container'>
                        Found locations:  
                        <span>{` ${locations.join(', ')}`}</span>
                    </div>

                    <Pagination/>
                </div>

                <ParkingCards parkings={parkings}/>

                </div> :

                <div className='fp_content_no_results'>
                    <p>Ooops...</p> 
                    <span>There are no parkings in the searched location, please try searching a City.</span> 
                </div>
            }
            
        </div>
        );
  };