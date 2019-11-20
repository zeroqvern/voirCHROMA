import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { getResult } from '../actions/ColorActions';
import PropTypes from 'prop-types';

class Buttons extends Component {
    componentDidMount() {
        this.props.getResult();
      }

    onClick = e => {
        window.location.reload();
    }

      
  render() {
    const image = this.props.result.image;
    const url = image.img_url;

    return (
        // <div style={{position:"relative", pos}}>
            <div className="resultBtn">
                <img style={{height:"150px", width: "150px",
                             marginBottom: "20px", marginLeft:"10px",
                             objectFit: "cover"}}
                             src={url}/>
                
                <button className="styleButton redBG centerBtn"
                    style={{marginTop: "20px"}}
                    onClick={this.onClick}>
                    Find New
                </button>
            </div>
        // </div>
      
    )
  }
  
}

const mapStateToProps = state => ({
    result: state.result
  })
  
  
 Buttons.propTypes = {
    getResult: PropTypes.func.isRequired,
    result: PropTypes.object.isRequired
  }
  

export default connect (
mapStateToProps,
{ getResult }
)(Buttons); 