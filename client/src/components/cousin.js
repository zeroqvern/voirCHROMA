import React, { Component } from 'react';
import '../App.css';

function Cousin (props) {
  
  const bgImg = props.bgImg;

    return (
        <div className="cousin">
          <img src={bgImg}/>
        </div>
    )
}

export default Cousin;