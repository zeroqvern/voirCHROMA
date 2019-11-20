import React, { Component } from 'react';
import Header from './header'
import Content from './body'
import Gallery from './gallery'


class Home extends Component {
  
  render() {
    return (
        <div id="bg" >
            <Header />
            <Content />
            <Gallery />

        </div>
    );
  }
}

export default Home;