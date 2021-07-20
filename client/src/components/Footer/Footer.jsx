import React from 'react';

import './Footer.css';

import yelpLogo from '../../utils/img/footer/yelp_logo.png'

export default function Footer() {
    return (
        <div className='footer_container'>

            <div className='footer_left_container'>

                <div className='footer_left_sub'>
                    <span className='bold'>Made By:</span>
                    <span>Christian Vivas</span>
                </div>
                <div className='footer_left_sub footer_margin_left'>
                    <span className='bold'>Contact me:</span>
                    <div className='footer_left_contact_links_container'>
                        <span>davidu7@hotmail.com</span>
                        <span className='footer_margin_left'>+57 3017710638</span>
                        <a className='footer_margin_left' href="https://www.linkedin.com/in/christiandavidvivas/"  target="_blank" rel="nofollow noopener noreferrer">
                            <span>LinkedIn</span>
                        </a>
                        <a className='footer_margin_left' href="https://github.com/Davidohiv7/"  target="_blank" rel="nofollow noopener noreferrer">
                            <span>GitHub</span>
                        </a>
                        <a className='footer_margin_left' href="https://davidohiv7.github.io/"  target="_blank" rel="nofollow noopener noreferrer">
                            <span>Portfolio</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className='footer_right_container'>
                <span>Data source: </span>
                <a href="https://www.yelp.com/"  target="_blank" rel="nofollow noopener noreferrer">
                    <img src={yelpLogo} alt="yelp_logo"/>
                </a>
            </div>

        </div>
        );
  };