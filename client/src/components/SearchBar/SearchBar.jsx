import React, { useState } from 'react'

import './SearchBar.css';


export default function SearchBar() {

    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = function(e) {
        setSearchInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        alert(searchInput)
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