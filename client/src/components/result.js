import React, { Component } from 'react';
import AppNavBar from './header';
import Buttons from './resultBtn';
import ColorList from './colorList';
import Details from './colorDetails'
import '../App.css';



class ResultPage extends Component {

  render() {
    
    return (
      <div id="resultBg" >
        <AppNavBar />
        <div id="resultBody">
            <Buttons />
            <ColorList />
            <Details  />
        </div>
        
        
      </div>
    )
  }
  
}

export default ResultPage;