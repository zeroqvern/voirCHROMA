import React, { Component } from 'react';
import HomePage from './home';
import ResultPage from './result';
import HistorySavedPage from './saved';
import LoadingPage from './loadingPage';
import '../App.css';

import { connect } from 'react-redux';
import { getStates } from '../actions/ColorActions';
import { getAuth, updateImagesArr } from '../actions/userAuthActions';
import PropTypes from 'prop-types';

class Main extends Component {
  componentDidMount() {
    this.props.getStates();
    this.props.getAuth();
    
  }


  render() {

    const resultColor = this.props.result.image;
    const historySaved = this.props.result.history_saved;
    const loading = this.props.result.loading;
    

    // console.log(resultColor, historySaved);


    if (loading == true){
      return(<LoadingPage />)}
    else {
      if(historySaved == true) {
        var card = document.getElementsByName("card");
        for(var i = 0; i < card.length; i++)
        { card[i].className = "savedCard fadeIn"; }
        return(<HistorySavedPage />)
      }
      else {
          if((resultColor == undefined || resultColor == [] 
            || resultColor == null || resultColor == "" || resultColor== {})){
            return (<HomePage />)}
          else{
            var isResulttEmpty = !Object.keys(resultColor).length;
            if(isResulttEmpty){
              return (<HomePage />)}
            else {
              // const imagesId = resultColor.id
              // const id = this.props.auth.user._id;
              // console.log(id, imagesId);

              // const update = {id, imagesId}
              // this.props.updateImagesArr(id, imagesId);
              
              return(<ResultPage />)}
          }
        }
    }
  } 
}



Main.propTypes = {
  getStates: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  getAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  result: state.result,
  auth: state.auth
});

export default connect(mapStateToProps, { getStates, getAuth, updateImagesArr })(Main);
