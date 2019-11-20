import React, { Component } from 'react';
import LoadingPage from './loadingPage';
import UserPage from './main';
import StarterPage from './starterPage';
import Login from './auth/RegisterPage';
import '../App.css';

import { connect } from 'react-redux';
import { getStates } from '../actions/ColorActions';
import { getAuth } from '../actions/userAuthActions';
import PropTypes from 'prop-types';

class Handler extends Component {
  componentDidMount() {
    this.props.getStates();
    this.props.getAuth();
    
  }


  render() {

    const loading = this.props.result.loading;
    const auth = this.props.auth.isAuthenticated;

    // return(
    //     <StarterPage />

    // );


    if (loading == true){
      return(<LoadingPage />)}
    else {
      if(auth != null && auth != "") {
          return(<UserPage />)
      }
      else{
          return(<StarterPage />)
      }
    }
  } 
}



Handler.propTypes = {
  getStates: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  getAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  result: state.result,
  auth: state.auth
});

export default connect(mapStateToProps, { getStates, getAuth })(Handler);
