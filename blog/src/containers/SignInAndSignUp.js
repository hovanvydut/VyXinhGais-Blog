import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { cambiar_login, cambiar_sign_up } from './scripts/sigin';
import './stylesheets/SignInAndSignOut.css';
import { loginRequest, signUpRequest } from '../actions/auth';
import 'react-toastify/dist/ReactToastify.min.css';

class SignInAndSignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: '',
        password: '',
      },
      signUp: {
        fullname: '',
        email: '',
        password: '',
        retypePassword: '',
      },
    };
  }

  handleFormSignIn = e => {
    const { login } = this.state;
    const { name, value } = e.target;
    const email = name === 'emailLogin' ? value : login.email;
    const password = name === 'passwordLogin' ? value : login.password;

    this.setState({
      login: {
        email,
        password,
      },
    });
  };

  onSignIn = () => {
    const { login } = this.state;
    const { loginDispatch } = this.props;
    loginDispatch(login.email, login.password);
  };

  handleFormSignUp = e => {
    const { signUp } = this.state;
    const { name, value } = e.target;
    const fullname = name === 'fullnameSignUp' ? value : signUp.fullname;
    const email = name === 'emailSignUp' ? value : signUp.email;
    const password = name === 'passwordSignUp' ? value : signUp.password;
    const retypePassword =
      name === 'retypePasswordSignUp' ? value : signUp.retypePassword;

    this.setState({
      signUp: {
        fullname,
        email,
        password,
        retypePassword,
      },
    });
  };

  onSignUp = () => {
    const { signUp } = this.state;
    const { signUpDispatch } = this.props;
    signUpDispatch(signUp);
  };

  render() {
    const { auth } = this.props;
    const { login, signUp } = this.state;
    const { user, loggedIn, errorLogin } = auth;

    if (loggedIn && Date.now() / 1000 <= user.exp) {
      return <Redirect to="/" />;
    }

    return (
      <div className="cotn_principal">
        <ToastContainer />
        {errorLogin ? toast.error('Username or password wrong') : null}
        <div className="cont_centrar">
          <div className="cont_login">
            <div className="cont_info_log_sign_up">
              <div className="col_md_login">
                <div className="cont_ba_opcitiy">
                  <h2>LOGIN</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button
                    type="button"
                    className="btn_login"
                    onClick={cambiar_login}
                  >
                    LOGIN
                  </button>
                </div>
              </div>
              <div className="col_md_sign_up">
                <div className="cont_ba_opcitiy">
                  <h2>SIGN UP</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button
                    type="button"
                    className="btn_sign_up"
                    onClick={cambiar_sign_up}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
            <div className="cont_back_info">
              <div className="cont_img_back_grey">
                <img
                  src="/images/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="cont_forms">
              <div className="cont_img_back_">
                <img
                  src="/images/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg"
                  alt=""
                />
              </div>
              <div className="cont_form_login">
                <h2>LOGIN</h2>
                <input
                  name="emailLogin"
                  type="text"
                  placeholder="Email"
                  value={login.email}
                  onChange={this.handleFormSignIn}
                />
                <input
                  name="passwordLogin"
                  type="password"
                  placeholder="Password"
                  value={login.password}
                  onChange={this.handleFormSignIn}
                />
                <button
                  type="button"
                  className="btn_login"
                  onClick={this.onSignIn}
                >
                  LOGIN
                </button>
              </div>
              <div className="cont_form_sign_up">
                <h2>SIGN UP</h2>
                <input
                  name="fullnameSignUp"
                  type="text"
                  placeholder="Fullname"
                  value={signUp.fullname}
                  onChange={this.handleFormSignUp}
                />
                <input
                  name="emailSignUp"
                  type="text"
                  placeholder="Email"
                  value={signUp.email}
                  onChange={this.handleFormSignUp}
                />
                <input
                  name="passwordSignUp"
                  type="password"
                  placeholder="Password"
                  value={signUp.password}
                  onChange={this.handleFormSignUp}
                />
                <input
                  name="retypePasswordSignUp"
                  type="password"
                  placeholder="Confirm Password"
                  value={signUp.retypePassword}
                  onChange={this.handleFormSignUp}
                />
                <button
                  type="button"
                  className="btn_sign_up"
                  onClick={this.onSignUp}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignInAndSignOut.propTypes = {
  auth: PropTypes.object,
  loginDispatch: PropTypes.func,
  signUpDispatch: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    auth: state.Auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginDispatch: (email, password) => dispatch(loginRequest(email, password)),
    signUpDispatch: data => dispatch(signUpRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInAndSignOut);
