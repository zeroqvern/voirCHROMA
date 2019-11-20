import React, { Component } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { callAPI } from '../actions/ColorActions';
import { viewSaved } from '../actions/ColorActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSample, setSample } from '../actions/ColorActions';
import { updateImagesArr, getAuth } from '../actions/userAuthActions';


class FindApp extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     imgUrl: ''
  //   }
  //   this.onChange = this.onChange.bind(this);
  // }

 
  componentDidMount () {
    this.props.getSample();
    this.props.getAuth();
  }

  state = {
    imgUrl: ''
  }

  // onChange = e => {
  //   const value = document.getElementById('search').value;
  //   this.setState({
  //     [e.target.name]: value
  //   });
  //   // alert(this.state.imgUrl)

  // }  

  isURL(str) {
    console.log("checking url...")
    var regex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg|\?raw=true)$/;
    var urlRegex = new RegExp(regex);
    return (urlRegex.test(str));
  }



  FindColors = e => {
    e.preventDefault();
  

    const newImgUrl = document.getElementById('search').value
      // const sampleUrl =  this.props.result.imgUrl;
  
    // if((newImgUrl == "" || newImgUrl == null) && (sampleUrl == "" || sampleUrl == null))
    if((newImgUrl == "" || newImgUrl == null))
    {
      alert("Please enter something!")
    }
    else{
     
      if(this.isURL(newImgUrl))
      {
        console.log("calling...")
        var userId = this.props.auth.user._id;
        if(userId == undefined)
        {
          userId = this.props.auth.user.id;
        }
        this.props.callAPI(newImgUrl, userId);
      }
      else {
        alert("Please enter valid image URL!");
      }
      // alert(newImgUrl);

    }


    // this.props.viewSaved("1573568887374")
  }

  Clear = e => { 
    // this.props.result.imgUrl = "";
    this.props.setSample("");

    document.getElementById('search').value='';

    // alert(this.props.result.imgUrl)
  }

  render() {
    return (
    <div style={{marginTop: "10px"}}>
        
        <img id="logo" 
        src={require('../assets/logo.png')}
        style={{display: "block", margin: "auto", paddingTop: "10px"}}
        alt="" 
        />
        <div style={{marginTop: "20px"}}>
            <div className="searchMaster">
              <input id="search" type="text" placeholder="Image URL"
                      name="imgUrl" defaultValue={ this.props.result.imgUrl} onChange={this.onChange}/>

              <button onClick={this.Clear} className="styleButton redBG"
                      style={{marginLeft: "20px", padding: "10px",
                      paddingRight: "15px", paddingLeft: "15px", fontSize:"18px"}}
                >
                Clear
                </button>

            </div>
            
           
            <button onClick={this.FindColors} className="styleButton tealBG centerBtn "
                  style={{marginTop: "20px", }}
            >
            Find Colours
            </button>
               
              {/* <div><h1>{this.state.imgUrl}</h1></div> */}
        </div>

    </div>
    )
  }
  
}

const mapStateToProps = state => ({
  result: state.result,
  auth: state.auth
})


FindApp.propTypes = {
  getSample: PropTypes.func.isRequired,
  setSample: PropTypes.func.isRequired,
  callAPI: PropTypes.func.isRequired,
  viewSaved: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAuth: PropTypes.func.isRequired
}



export default connect (
  mapStateToProps,
  { callAPI, getSample, viewSaved, setSample, getAuth }
  )(FindApp); 
