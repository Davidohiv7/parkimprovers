import React from 'react';

import './Home.css';
import './HomeMobile.css';

import SearchBar from '../SearchBar/SearchBar'
import HomeBottom from './HomeBottom/HomeBottom'

import homeBanner from '../../utils/img/home/banner.png'

export default function Home() {
    return (
        <div className='home_container'>

            <div className='home_first_container'>
                <div className='home_left_container'>

                    <p className='home_left_title'>
                        Want to help some 
                        <span> Parkings?</span>
                    </p>

                    <p className='home_left_subtitle'>
                        There are many business that need your help, search some parkings, and help them grow up!
                    </p>

                    <SearchBar/>

                </div>

                <div className='home_right_container'>

                    <img src={homeBanner} alt="Home_image"/>

                </div>
            </div>

            <HomeBottom/>

        </div>
        );
  };