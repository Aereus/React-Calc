import React from 'react'
import './Button.css'

function Button(props) {
    return (
        <button value={props.value} onClick={props.handleClick} style={props.style} className={props.clName}>{props.value}</button>
    );
}

export default Button
