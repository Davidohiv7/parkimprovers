import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './SearchBar.css';


import { searchParkings } from '../../actions/parking_actions'


export default function SearchBar() {

    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = function(e) {
        setSearchInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(searchParkings(searchInput))
    }

    return (
            <form className='sb_container' onSubmit={handleSubmit}>

                <input 
                    type="text" 
                    placeholder='Write a location...' 
                    onChange={handleInputChange}
                    value={searchInput}
                />

                <div className='sb_button_container'>

                    <button>Search</button>

                </div>

            </form>
        );
  };