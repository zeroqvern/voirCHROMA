import React ,{ Component } from 'react';
import '../App.css';
import Header from './header';
import Card from './savedCard';

import { connect } from 'react-redux';
import { getImages } from '../actions/ColorActions';
import { getAuth } from '../actions/userAuthActions';
import PropTypes from 'prop-types';


class Saved extends Component{
    componentDidMount() {
        this.props.getImages();
        this.props.getAuth();
      
      }

    
    render(){

        const imageData =[];
        const images = this.props.result.image;

        // console.log(images);
        var emptyCard = false;
        if(images.length == 0) {
            emptyCard = true;
        }

        for (var i = 0; i < images.length; i++ )
        {
            var image = {
              id: i,
              imgId: images[i].imgId,
              imgUrl:images[i].img_url,
              colors: images[i].colors,
            }
            imageData.push(image);
        }

        var userId = this.props.auth.user.id;
        if (userId == undefined)
          userId = this.props.auth.user._id;
        console.log("userid: ", userId);
        // imageData.push({id: images.length, userId: this.props.auth.user._id});

        console.log(imageData)

        if(emptyCard == true)
        {
          return(
            <div id="savedBg">
              <Header />
              <div id="savedMaster">
                <div id="card" className="savedCard">
                  <p className="purpleFont" style={{fontSize:"30px"}}>
                    Hmm it's seem like your search history is empty! < br/>
                    Time to do a new search!</p>
                    <div>
                      <div className="purpleBG"
                           style={{height:"50px", width:"50px", float:"right",
                                   marginLeft:"20px"}}/>
                       <div className="tealBG"
                           style={{height:"50px", width:"50px", float:"right",
                                   marginLeft:"20px"}}/>
                        <div className="redBG"
                           style={{height:"50px", width:"50px", float:"right",
                                   marginLeft:"20px"}}/>
                        
                    </div>
                </div>

              </div>
            </div>
          )
        }
        else {
          const CardComponent = imageData.map( sample => {
            return( 
              <Card
                key = {sample.id}
                id = {sample.imgId}
                imgUrl = {sample.imgUrl}
                colors = {sample.colors}
                userId = { userId }
                /> ) 
          })


          return(
              <div id="savedBg">
                  <Header />
                  <div id="savedMaster">
                      { CardComponent  }

                  </div>
              </div>
          )
        }

       
    }
}

const mapStateToProps = state => ({
    result: state.result,
    auth: state.auth
  })
  
  
  Saved.propTypes = {
    getImages: PropTypes.func.isRequired,
    result: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getAuth: PropTypes.func.isRequired
  }
  
  
  export default connect (
    mapStateToProps,
    { getImages, getAuth }
    )(Saved); 
