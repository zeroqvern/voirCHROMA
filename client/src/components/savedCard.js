import React ,{ Component } from 'react';
import '../App.css';
import '../anim.css';
import Color from './colorHistorySaved';

import { connect } from 'react-redux';
import { viewSaved } from '../actions/ColorActions';
import { historySaved } from '../actions/ColorActions';
import { deleteImage } from '../actions/ColorActions';
import PropTypes from 'prop-types';


function Saved (props){

    const visi= props.visible;
    const url = props.imgUrl;
    const id = props.id;


    const colorsData = [];
    const colors = props.colors;

    for (var i = 0; i < colors.length; i++){
        const colorObj = {};
  
        colorObj.id = i;
        colorObj.hex = colors[i];
        colorsData.push(colorObj);
      }
    
    const ColorComponent = colorsData.map( sample => {
    return( 
        <Color
        key = {sample.id}
        color = {sample.hex}
        /> ) 
    })

    function click() {
        props.viewSaved(props.id);
    }

    function deleteClick() {
        // alert (props.id);
        var card = document.getElementsByName("card");
        console.log("============================")

        console.log(props.id);
        for(var i = 0; i < card.length; i++)
        {
            console.log(card[i].id);
            if(card[i].id == props.id)
            {
                console.log("true");
                console.log(props.userId, props.id)
                props.deleteImage(props.userId,props.id);
                card[i].className = "";
                card[i].className = "savedCard fadeOut";
            }
            else{
                console.log("false");

                card[i].className = "savedCard";
                // card[i].className ="savedCard fadeIn";
            }
        }
       
    }

    

    return(
        <div id={props.id} name="card" className="savedCard">
            <div className="savedRow">
                <div className="image">
                    <img src={url} style={{height:"200px", width:"200px"}}/>
                </div>
                <div className="colorsFound">
                    { ColorComponent }
                </div>
                
                
            </div>
            <div className="rowBtn">
                    <button className="styleButton tealBG"
                            style={{fontSize: "15px"}}
                            onClick={click}>
                            View
                    </button>
                    <button className="styleButton redBG"
                            style={{fontSize: "15px", marginLeft:"15px"}}
                            onClick={deleteClick}>
                            Delete
                    </button>
                </div>
        </div>
    )

}

const mapStateToProps = state => ({
    result: state.result
  })
  
  
Saved.propTypes = {
    viewSaved: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    historySaved: PropTypes.func.isRequired,
    result: PropTypes.object.isRequired
}
  
  
export default connect (
mapStateToProps,
{ viewSaved, deleteImage, historySaved }
)(Saved); 

