import React from 'react';
import '../App.css';

import { setSample } from '../actions/ColorActions';
import { connect } from 'react-redux';

function GalleryItem(props) {
  const link = props.uri;
//
  function click() {
    // props.setSample(props.link);
    const link = props.link;
    document.getElementById('search').value=link;
    props.setSample(props.link);
  }
  if(link.includes("mGlory"))
  {
    return (
    <div className="gallery centerBtn">
       <img style={{objectPosition: "top"}} src={props.uri} alt="" onClick={click} />
    </div>
    );
  }
  else{
    return (
      <div className="gallery centerBtn">
        <img src={props.uri} alt="" onClick={click}/>
        
      </div>
      );
  }
}
const mapStateToProps = state => ({
})

export default connect (
  mapStateToProps,
  { setSample }
  )(GalleryItem); 

