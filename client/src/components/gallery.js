import React, { Component } from 'react';
import Item from './galleryItem'
import '../App.css';
import sampleData from './galleryData';


class Gallery extends Component {
 
  render()
  {
    const galleryItemComponent = sampleData.map( sample => {
      return( 
        <Item
          key={sample.id}
          uri={sample.uri}
          link={sample.link}
          /> ) 
    })

    return (
      <div>
        <p className="purpleFont"
          style={{marginLeft: "25%", marginTop: "20px"}}>
          Sample Images</p>
        <div className="galleryMaster">
            {galleryItemComponent }
        </div>
      </div>
    );
  }
}



export default Gallery;
