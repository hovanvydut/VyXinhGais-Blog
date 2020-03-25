import React, { Component } from 'react';

class LoadingBar extends Component {
  render() {
    return (
      <div className="loading-bar">
        <img src="images/loading-bar.gif" alt="loading icon" />
        {/* <img src="images/loading-spinner.gif" alt="loading icon" /> */}
      </div>
    );
  }
}

export default LoadingBar;
