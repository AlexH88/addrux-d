import React, { Component } from 'react';
// import SVGLoader from '../assets/images/icons/preloader.svg';

class Preloader extends Component {
  render() {
    return (
      <div className="preloader-container">
        <div className="cssload-container">
          <div className="cssload-whirlpool"></div>
        </div>
      </div>
    );
  }
}

export default Preloader;