import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";

import './SearchBar.css';


import { searchParkings } from '../../actions/parking_actions'
import { searchErrorMessage } from '../../actions/home_actions'


export default function SearchBar( { match } ) {

    const dispatch = useDispatch();
    const location = useLocation()
    const history = useHistory()

    const { messages  } = useSelector((state) => ({ ...state.homeReducer }))

    const [searchInput, setSearchInput] = useState('');
    const [autohide, setAutoHide] = useState(null);

    useEffect(
        () => {
            if(autohide) {
                clearTimeout(autohide);
                setAutoHide(null)
            }
            if(messages.search_error) {
                const timeOut = setTimeout(() => dispatch(searchErrorMessage('')), 5000)
                setAutoHide(timeOut)
            }
        },
    [messages]);



    const handleInputChange = function(e) {
        setSearchInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(!searchInput) {
            dispatch(searchErrorMessage('Please fill the search bar input'))
        }
        if(searchInput) {
            dispatch(searchErrorMessage(''))
            dispatch(searchParkings(searchInput))
            if(location.pathname === '/') {
                history.push('/search')
            }
        }
        setSearchInput('')
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

                {
                    messages.search_error ? 
                    <div className='sb_error_message_container'>
                        <span>{messages.search_error}</span>
                        <div>
                            <button onClick={() => dispatch(searchErrorMessage(''))}>
                                X
                            </button>
                        </div>
                        
                    </div> :
                    undefined
                }

            </form>
        );
  };