import React, { Component } from 'react';
import '../App.css';


import { changeIndex } from '../actions/ColorActions';
import { connect } from 'react-redux';

function Color(props) {

  const hex = props.color

  function click() {
    props.changeIndex(props.id);
  }

    return (
        <div>
            <button className="color"
                style={{backgroundColor: hex}} onClick={click}>
            </button>
            
        </div>
      
    );
  }
  
const mapStateToProps = state => ({
  })
  
export default connect (
  mapStateToProps,
  { changeIndex }
  )(Color); 
  
  