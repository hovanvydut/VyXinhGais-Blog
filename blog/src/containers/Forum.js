import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forum extends Component {
  componentDidMount() {}

  render() {
    const { Auth } = this.props;
    const { user, loggedIn } = Auth;
    if (!loggedIn || Date.now() / 1000 > user.exp) {
      alert('Vui long login!');
      return <Redirect to="/login" />;
    }
    return (
      <main className="travel-post">
        <section className="posts">
          <h1>Forum</h1>
        </section>
      </main>
    );
  }
}

Forum.propTypes = {
  Auth: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    Auth: state.Auth,
  };
};

export default connect(mapStateToProps)(Forum);
