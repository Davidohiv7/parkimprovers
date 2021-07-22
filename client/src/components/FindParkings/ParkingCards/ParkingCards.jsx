import React from 'react';
import { useSelector } from 'react-redux'

import './ParkingCards.css';
import './ParkingCardsMobile.css';

import ParkingCard from './ParkingCard/ParkingCard'
import Loader from '../../Loader/Loader'

export default function ParkingCards( { parkings } ) {

    const { loadingChangePage } = useSelector((state) => ({ ...state.parkingsReducer }))

    return (
        loadingChangePage ? 
        <div className='parking_cards_loader_container'>
            <Loader size={100} color={'#F8C342'} margin={'0rem 0rem 0rem 0rem'}/>
        </div>
          :
        <div className='parking_cards_container'>
            {   
                parkings.map( parking => {
                    return (
                        <ParkingCard key={parking.id} parking={parking}/>
                    )
                })
            }
        </div>
        );
  };