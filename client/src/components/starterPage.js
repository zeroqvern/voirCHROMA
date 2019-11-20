import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../actions/userAuthActions';

import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import Header from './header';

import '../App.css';

class Starter extends Component {
  

  static propTypes = {
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadUser()
  }
    

  render() {
    const loginOpen = this.props.auth.openLogin;
    const registerOpen = this.props.auth.openRegister;


    if(loginOpen){
      return(
        <div id="bg"> 
          <Header />
          <LoginPage />
        </div>
      )
    }
    else if (registerOpen) {
      return(
        <div id="bg" >
          <Header />
          <RegisterPage />
        </div>
      )
    }
    else {

    }

    return (
        <div id="title">
          
        <Header />
        <div id="intro" style={{fontSize: "50px", marginLeft: "80px", marginTop: "200px"}}>
            <div  >
                <span>See the </span> <span className="redFont" style={{fontStyle: "italic"}}>colours.</span>
                <br />
                <span>Know the </span> <span className="tealFont" style={{fontStyle: "italic"}}>colours.</span>
            </div>
        
            <div style={{fontSize: "20px", marginTop:"30px", marginBottom:"50px"}}>
                <p>
                    Extract the colours from the image you picked.
                    <br />
                    And learn more what the colours truly are.<br />
                    
                    </p>
                
            </div>
        
            {/* <button className="styleButton purpleBG" style={{float: "left", marginLeft:"20px"}}>
                Try as Guest
            </button> */}
        </div>
            
        </div>
    
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Starter);