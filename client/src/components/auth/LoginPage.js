import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openRegister, login } from '../../actions/userAuthActions';
import { clearErrors } from '../../actions/errorActions';

import { Alert } from 'reactstrap';


import '../../App.css';
import '../../anim.css';

class LoginPage extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    openRegister: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount(){
      this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // else{
    //     this.props.clearErrors();
    // }

    
  }

  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
        email,
        password
    };

    console.log(email, password);
    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
        <div style={{marginTop: "10px"}} className="fadeIn">
            
            <img id="logo" 
            src={require('../../assets/logo.png')}
            style={{display: "block", margin: "auto", paddingTop: "10px"}}
            alt="" 
            />

            {this.state.msg ? (
                <div className="alert">
                    {this.state.msg}
                </div>
            ) : null}
            
            <div className="searchMaster">
            <input id="search" type="text" placeholder="email"
                      name="email" style={{marginTop: "20px"}}
                      onChange={this.onChange}/>

            <input id="search" type="password" placeholder="password"
                      name="password" style={{marginTop: "20px"}}
                      onChange={this.onChange}/>
            < br />


            </div>
            
                
            <div className="searchMaster">

                <button onClick={this.login} className="styleButton purpleBG "
                        style={{marginTop: "20px" }}
                >
                Log In
                </button>
                <button onClick={this.register} className="tealFont"
                        style={{marginTop: "20px", marginLeft: "20px", border: "none", backgroundColor:"white"}}
                >
                or click here to register
                </button>
                    
            </div>

        </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { openRegister, clearErrors, login }
)(LoginPage);