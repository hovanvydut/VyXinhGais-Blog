import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="loader-container" id="loader">
        <div className="loader-overlay" />
        <div className="temp">
          <div className="loader" />
        </div>
      </div>
    );
  }
}

export default Loading;
