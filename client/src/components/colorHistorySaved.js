import React, { Component } from 'react';
import '../App.css';

function Color (props) {
  
  const color = props.color;
  // console.log(color);
  // console.log("================");

    return (
        <div className="colorHistory" style={{backgroundColor: color}}>
        {/* // <div className="colorHistory" style={{backgroundColor:"blue"}}> */}
        </div>
    )
}

export default Color;