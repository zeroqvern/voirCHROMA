import React, { Component } from 'react';
import '../App.css';
import DetailInfo from './detailInfo';
import Cousin from './cousin';
import Color from './colorSingle';

import { connect } from 'react-redux';
import { getResult } from '../actions/ColorActions';
import PropTypes from 'prop-types';

class Details extends Component {
    componentDidMount() {
        this.props.getResult();
      }

  render() {
    
    const image = this.props.result.image;
    const index = this.props.result.index;

    const color = this.props.result.image.colors[index];
    console.log(this.props.result);

    const cousins = color.cousins;
    const cousinsData = [];
    
    for (var i = 0; i < cousins.length; i++){
      const cousinObj = {};

      cousinObj.id = i;
      cousinObj.bgImg = cousins[i].img_value;
      cousinsData.push(cousinObj);
    }

    const cousinItemComponent = cousinsData.map( sample => {
        return( 
          <Cousin
            key = {sample.id}
            bgImg = {sample.bgImg}
            /> ) 
      })

      return (
        <div className="detailsMaster">
            <div className="detailsFirstRow">
                <Color />
                <DetailInfo />
            </div>
            <p  className="purpleFont"
                style={{
                    float: "left",
                    marginTop: "50px",
                    fontWeight:"bold",
                    fontSize: "20px"}}>
                    Cousins</p>
            <div className="detailsSecondRow">
                { cousinItemComponent }
            </div>
        </div>

      )

  }
}

const mapStateToProps = state => ({
  result: state.result
})


Details.propTypes = {
  getResult: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired
}


export default connect (
  mapStateToProps,
  { getResult }
  )(Details); 