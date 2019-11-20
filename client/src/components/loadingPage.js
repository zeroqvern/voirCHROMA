import React, { Component } from 'react';
import Header from './header';
import '../App.css';
import '../loading.css';

import { connect } from 'react-redux';
import { getStates } from '../actions/ColorActions';
import PropTypes from 'prop-types';

class LoadingPage extends Component {
  componentDidMount() {
    // this.props.getStates();
  }


  render() {
    return (
        <div id="bg" >
            <Header />
            <div className="loadingMaster">

                <div className="lds-hourglass center"></div>
                <div className="purpleFont loadingText">Colours are on the way</div>
                <div className="loaderDots">
                    <div className="loader"/>
                </div>
            </div>
        </div>
    )
  }
  
}



LoadingPage.propTypes = {
  getStates: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  result: state.result
});

export default connect(mapStateToProps, { getStates })(LoadingPage);
