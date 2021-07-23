import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// import { getNearByParkings } from '../../actions/parking_actions'
import { searchParkings } from '../../actions/parking_actions'

import './NavBar.css';
import './NavBarMobile.css';

import { AiFillCar } from 'react-icons/ai';

export default function NavBar() {

    const dispatch = useDispatch();

    const pathname = useLocation().pathname

    useEffect(
        () => {
            //Detect nearby parkings, requires https to run in production
            // navigator.geolocation.getCurrentPosition(function(position) {
            //     const currentPosition = {
            //         latitude: position.coords.latitude,
            //         longitude: position.coords.longitude,
            //     }
            //     dispatch(getNearByParkings(currentPosition))
            // })
            dispatch(searchParkings('San Francisco'))
        },
    // eslint-disable-next-line
    []);

    return (
        <div className='navbar_container'>
            <Link className='navbar_link' to={'/'}> 
                <AiFillCar/>
                <span id='navbar_title1'>Park</span>
                <span id='navbar_title2'>Improvers</span>
            </Link>

            <div className='links_container'>

                <Link className={pathname === '/' ? 'navbar_selected_link' : undefined} to={'/'}>
                    <div/>
                    <span>Home</span>
                </Link>

                <Link className={pathname.includes('/search') ? 'navbar_selected_link' : undefined} to={'/search'}>
                    <div/>
                    <span>Find Parkings</span>
                </Link>

                <Link className={pathname.includes('/favourites') ? 'navbar_selected_link' : undefined} to={'/favourites'}>
                    <div/>
                    <span>Favourites</span>
                </Link>

            </div>

        </div>
        );
  };