import React from 'react';
import { useSelector } from 'react-redux'

import './FindParkings.css';
import './FindParkingsMobile.css';

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
                    <span className='fp_header_title'>Find parking lots worldwide:</span>
                    <SearchBar className='fp_searchbar'/>
                </div>
            </div>

            {
                loading ? 
                <div className='fp_loader_container'>
                    <Loader size={100} color={'#F8C342'} margin={'0rem 0rem 0rem 0rem'}/> 
                </div>
                :
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