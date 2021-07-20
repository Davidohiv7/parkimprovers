import React from 'react';

import './HomeBottom.css';

import { FaSearch } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { ImPhone } from 'react-icons/im';
import { BiMessageSquareDetail } from 'react-icons/bi';


export default function HomeBottom() {
    return (
        <div className='homeBottom_container'>

            <span className='homeBottom_title'> Here You Can ... </span>

            <div className='homeBottom_features_container '>

                <div>
                    <FaSearch className='homeBottom_features_icons'/>
                    Find parkings worldwide
                </div>
                <div>
                    <MdFavorite className='homeBottom_features_icons'/>
                    Add them to favourites
                </div>
                <div>
                    <BiMessageSquareDetail className='homeBottom_features_icons'/>
                    Explore parking details
                </div>
                <div>
                    <ImPhone className='homeBottom_features_icons'/>
                    Contact the parkings
                </div>

            </div>

        </div>
        );
  };