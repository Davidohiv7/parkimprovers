import React from 'react';

import './ParkingCards.css';

import ParkingCard from './ParkingCard/ParkingCard'

export default function ParkingCards( { parkings } ) {


    return (
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