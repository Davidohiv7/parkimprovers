import React from 'react';

import './ParkingCard.css';

import noImage from '../../../../utils/img/find/no_image.png'
import yelp_logo from '../../../../utils/img/find/yelp_logo.svg'

export default function ParkingCard( { parking } ) {


    return (
        <div className='parking_card_container'>
            <img src={parking.image_url || noImage} alt={parking.name}/>
            <div className='parking_card_data_container'>
                <span>{parking.name}</span>
                <hr/>
                <div className='parking_card_location_container'>
                    <span>{parking.address[0]}</span>
                    <span>{parking.city}</span>
                </div>

                <div className='parking_card_bottom_container'>
                    <div className='parking_card_raiting_container'>
                        <div>
                            <span>Reviews: </span>
                            <span className='parking_card_raiting_italic'>{parking.review_count} </span> 
                        </div>
                        <div>
                            <span>Rating: </span>
                            <span className='parking_card_raiting_italic'>{parking.rating} </span> 
                        </div>
                        <div>
                            <span>Score: </span>
                            <span className='parking_card_raiting_italic'>{Math.round((parking.review_count * parking.rating) / (parking.review_count + 1) * 10) / 10}</span>
                        </div>
                    </div>
                    
                    <a href={parking.url}  target="_blank" rel="nofollow noopener noreferrer">

                        <img src={yelp_logo} alt="yelp_logo"/>
                    </a>
                </div>
            </div>
        </div>
        );
  };