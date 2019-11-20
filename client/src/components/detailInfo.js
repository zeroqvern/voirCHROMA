import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function DetailInfo(props){


    // const index = this.props.result.index;
    const index = props.result.index;
    const color = props.result.image.colors[index];
    const name = color.name;
    const hex = color.hex;
    const rgb = color.rgb;
    const hsl = color.hsl;
    const hsv = color.hsv;
    const cmyk = color.cmyk;

    return (
      <div className="details">
          {/* <div style={{display: "table-cell", verticalAlign:"middle"}}> 
          </div> */}

              <p className="paraName" >{name}</p>

              <p className="para">HEX: {hex}</p>
              <p className="para">RGB: {rgb} </p>
              <p className="para">HSL: {hsl}</p>
              <p className="para">HSV: {hsv} </p>
              <p className="para">CMYK: {cmyk}</p>

      </div>
        
        
    )
  
}

const mapStateToProps = state => ({
  result: state.result
})


DetailInfo.propTypes = {
  result: PropTypes.object.isRequired
}


export default connect (
  mapStateToProps,
  { }
  )(DetailInfo); 