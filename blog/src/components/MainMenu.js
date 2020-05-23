import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionAuth from '../actions/auth';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listMenu: [
        {
          id: 1,
          name: 'Home',
          path: '/',
        },
        {
          id: 2,
          name: 'Blog',
          path: '/blog',
        },
        {
          id: 3,
          name: 'Travel',
          path: '/travel',
        },
        {
          id: 4,
          name: 'About',
          path: '/about.html',
        },
        {
          id: 5,
          name: 'Forum',
          path: '/forum',
        },
        {
          id: 6,
          name: 'Login',
          path: '/login',
        },
      ],
    };
  }

  signOut = () => {
    const { signOutRequest } = this.props;
    signOutRequest();
  };

  showList = () => {
    const { listMenu } = this.state;
    const { loggedIn } = this.props;

    const xhtml = [];
    listMenu.forEach(item => {
      xhtml.push(
        item.name === 'Login' && loggedIn === true ? (
          <li className="main-menu__item" key={item.id} onClick={this.signOut}>
            <Link to="#">Logout</Link>
          </li>
        ) : (
          <li className="main-menu__item" key={item.id}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        )
      );
    });
    return xhtml;
  };

  render() {
    return (
      <nav>
        <ul className="main-menu">{this.showList()}</ul>
      </nav>
    );
  }
}

MainMenu.propTypes = {
  loggedIn: PropTypes.bool,
  signOutRequest: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    loggedIn: state.Auth.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOutRequest: () => dispatch(actionAuth.signOut()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainMenu)
);
