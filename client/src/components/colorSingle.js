import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ColorSingle (props) {

  const index = props.result.index;
  const hex = props.result.image.colors[index].hex;
  console.log(hex);

  return (
      <div className="detailsColor" style={{backgroundColor: hex}}/>
  )
  
}


const mapStateToProps = state => ({
  result: state.result
})


ColorSingle.propTypes = {
  result: PropTypes.object.isRequired
}


export default connect (
  mapStateToProps,
  { }
  )(ColorSingle); 