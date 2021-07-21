import React from 'react'


import './Loader.css';


export default function Loader({ size, color, margin, bgcolor}) {

    const loaderStyles = {
        width: size,
        height: size,
        border: `16px solid ${bgcolor || '#f3f3f3'}`,
        borderTop: `16px solid ${color}`,
        margin: margin || '0rem 0rem 0rem 0rem'
    }

    return (
        <div style={loaderStyles} class="loader" />
    );
};