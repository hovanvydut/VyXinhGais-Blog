import React from 'react';

class SubcribeForm extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="subscribe-form">
          <h3>Subscribe for newsletter</h3>
          <div>
            <input
              type="text"
              autoComplete="false"
              placeholder="Enter Email Address"
            />
            {/* <img src="./images/paper-plane.svg" alt="paper-plane-icon" /> */}
            <i className="fas fa-paper-plane" />
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright ©2020 All rights reserved | This template is made with{' '}
            <i className="fas fa-heart" /> by hovanvydut
          </p>
        </div>
      </div>
    );
  }
}

export default SubcribeForm;
