import React, { Component } from 'react';
import '../App.css';
import Color from './color';

import { connect } from 'react-redux';
import { getResult } from '../actions/ColorActions';
import { updateImagesArr, getAuth } from '../actions/userAuthActions';

import PropTypes from 'prop-types';


class ColorComp extends Component {

  componentDidMount(){
    this.props.getResult();
    // this.props.getAuth();

    
  }


  render() {
    

    const colors = this.props.result.image.colors;

    const colorsData = [];
    
    for (var i = 0; i < colors.length; i++){
      const colorObj = {};

      colorObj.id = colors[i].id;
      colorObj.index = i;
      colorObj.hex = colors[i].hex;
      colorsData.push(colorObj);
    }

    // colorObj.name = c.name,
    // colorObj.hsl = c.hsl,
    // colorObj.hsv = c.hsv,
    // colorObj.rgb = c.rgb,
    // colorObj.cmyk = c.cmyk


    const colorItemComponent = colorsData.map( sample => {
      return( 
        <Color
          key={sample.id}
          id = {sample.index}
          // color = {sample["img_bare"]
          color = {sample.hex}
          /> ) 
    })


    return (
      <div className="colorMaster">
          { colorItemComponent }
        
      </div>
    )
  }
  
}

const mapStateToProps = state => ({
  result: state.result,
  // auth: state.auth
})


ColorComp.propTypes = {
  getResult: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
  // getAuth: PropTypes.func.isRequired,
  // updateImagesArr: PropTypes.func.isRequired
}



export default connect (
  mapStateToProps,
  { getResult, updateImagesArr }
  )(ColorComp); 
