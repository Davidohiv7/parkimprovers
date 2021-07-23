import React, { useState, useEffect } from 'react'

import './Message.css';
import './MessageMobile.css';


export default function Message({messageState, setMessageState}) {


    const [autohide, setAutoHide] = useState(null);

    useEffect(
        () => {
            if(autohide) {
                clearTimeout(autohide);
                setAutoHide(null)
            }
            if(messageState.state) {
                const timeOut = setTimeout(() => setMessageState({
                    state: false,
                    text: '',
                    color: '',
                }), 5000)
                setAutoHide(timeOut)
            }
        },
    // eslint-disable-next-line
    [messageState.state]);



    return (
        <div style={{backgroundColor: messageState.color}} className='message_container'>

            <span>{messageState.text}</span>
            <div>
                <button onClick={() => setMessageState({
                    state: false,
                    text: '',
                    color: '',
                })}>
                    X
                </button>
            </div>
            
        </div>
        );
  };