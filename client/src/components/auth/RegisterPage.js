import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openLogin, register } from '../../actions/userAuthActions';
import { clearErrors } from '../../actions/errorActions';

import '../../App.css';
import '../../anim.css';

class RegisterPage extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    repassword: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    openLogin: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    
  }

  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  register = e => {
    e.preventDefault();

    const { name, email, password, repassword } = this.state;

    if(password != repassword) {
        this.setState({ msg: "Password not match!" });
    }
    else {
        console.log(name, email, password);
        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser);
    }

   
  };

  login = e => {
    this.props.openLogin();
  }

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
            <input id="search" type="text" placeholder="name"
                      name="name" style={{marginTop: "20px"}}
                      onChange={this.onChange}/>

            <input id="search" type="text" placeholder="email"
                      name="email" style={{marginTop: "20px"}}
                      onChange={this.onChange}/>
            < br />

            <input id="search" type="text" placeholder="password"
                      name="password" type="password" style ={{width: "25%", marginRight: "20px",
                      marginTop: "20px"}}  onChange={this.onChange}/>
            <input id="search" type="text" placeholder="re-type password"
                      name="repassword" type="password" style ={{width: "25%", marginTop: "20px"}}
                      onChange={this.onChange}/>

            </div>
            
                
            
            <div className="searchMaster">

                <button onClick={this.register} className="styleButton purpleBG "
                        style={{marginTop: "20px" }}
                >
                Register
                </button>
                <button onClick={this.login} className="tealFont"
                        style={{marginTop: "20px", marginLeft: "20px", border: "none", backgroundColor:"white"}}
                >
                or click here to login
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
  { openLogin, clearErrors, register }
)(RegisterPage);