import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

import { AiFillCar } from 'react-icons/ai';

export default function NavBar() {
    return (
        <div className='navbar_container'>
            <Link className='navbar_link' to={'/'}> 
                <AiFillCar/>
                <span id='navbar_title1'>Park</span>
                <span id='navbar_title2'>Improvers</span>
            </Link>

            <div className='links_container'>

                <Link className='navbar_links' to={'/'}>
                    <div/>
                    <span>Home</span>
                </Link>

                <Link to={'/search'}>
                    <div/>
                    <span>Find Parkings</span>
                </Link>

                <Link to={'/favourites'}>
                    <div/>
                    <span>Favourites</span>
                </Link>

            </div>

        </div>
        );
  };