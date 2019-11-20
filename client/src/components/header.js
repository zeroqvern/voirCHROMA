
import React, { Component, Fragment } from 'react';
import '../App.css';

import { historySaved } from '../actions/ColorActions';
import { openLogin, openRegister, logout, getAuth } from '../actions/userAuthActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from '../components/saved';
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"


class AppNavBar extends Component {
    
    componentDidMount(){
        this.props.getAuth();
    }
    

    loginClick = e => {
        this.props.openLogin();
        // alert( this.props.auth.openLogin);

       
    }

    registerClick = e => {
        this.props.openRegister();
    }
 
    historyClick = e => {
        var id = this.props.auth.user.id;
        if (id == undefined) id = this.props.auth.user._id;
        console.log(id)
        // console.log(this.props.auth.user._id);
        // console.log(this.props.auth.user);
        this.props.historySaved(id);
    }

    homeClick = e => {
        window.location.reload();
    }

    logout = e => {
        this.props.logout();
    }
    


    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <div>
                <button className="btn"
                    style={{marginTop: "5px", marginRight:"50px"}}
                    onClick={this.logout}>
                    Logout
                </button>
                <button className="btn"
                    style={{marginTop: "5px", marginRight:"50px"}}
                    onClick={this.historyClick}>
                    History
                </button>

                <button className="btn"
                    style={{marginTop: "5px", marginRight:"50px"}}
                    onClick={this.homeClick}>
                    Home
                </button>
                
                
                {/* <select className="btn" style={{marginTop: "5px", marginRight:"50px"}}>
                    <option value="asdasd">asdasd</option>
                    <option value="asdasd">asdd</option>
                    <option selected value="asdasd">aqwasd</option>
                </select> */}

                

            </div>
        );

        const guestLinks = (

    //     <Router>
            
    //         <Link to="/register" className="btn"
    //             style={{marginTop: "5px", marginRight:"50px"}}
    //             >
    //             Register
    //         </Link>
    //      <Switch>
    //        {/* <Route exact path="/result" component={ResultPage}/>
    //        <Route exact path="/saved" component={SavedPage}/> */}
    //        <Route exact path="/register" Component = {Home}>
    //       </Route>
    //      </Switch>
    //    </Router>


            <div>
                <button className="btn"
                    style={{marginTop: "5px", marginRight:"50px"}}
                    onClick={this.loginClick}>
                    Log in
                </button>

                <button className="btn"
                    style={{marginTop: "5px", marginRight:"50px"}}
                    onClick={this.registerClick}>
                    Register
                </button>
            </div>
        );


        return (
        <div id="header" >
            <div style={{}}>
                <img id="logoHeader"
                src={require('../assets/logo.png')}
                style={{marginLeft:"50px", float:"left"}}
                alt="" />
                {isAuthenticated ? authLinks : guestLinks}
               

            </div>
        </div>);
        
    }
    
    }
    

  
const mapStateToProps = state => ({
    result: state.result,
    auth: state.auth
    })
    
AppNavBar.propTypes = {
    historySaved: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    openLogin: PropTypes.func.isRequired,
    openRegister: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getAuth: PropTypes.func.isRequired
}

      
export default connect (
    mapStateToProps,
    { historySaved, openLogin, openRegister, logout, getAuth }
)(AppNavBar); 
    
    