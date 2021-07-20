import React from 'react'


import './Loader.css';


export default function Loader({ size, color, margin}) {

    const loaderStyles = {
        width: size,
        height: size,
        borderTop: `16px solid ${color}`,
        margin: margin || '0rem 0rem 0rem 0rem'
    }

    return (
        <div style={loaderStyles} class="loader" />
    );
};