/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { actionPostLogin } from '../../actions/index';
import s from './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
  }

  onChange = (e) => {
    this.props.user[e.target.name] = e.target.value;
  }

  onSubmitLogin = () => {
    this.props.actionPostLogin(this.props.user);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <div className={s.formGroup}>
            <a className={s.facebook} href="/auth/facebook">
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                />
              </svg>
              <span>페이스북으로 로그인</span>
            </a>
          </div>
          <div className={s.formGroup}>
            <a className={s.google} href="/auth/google">
              <svg
                className={s.icon}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' +
                  '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' +
                  '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' +
                  '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' +
                  '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' +
                  '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' +
                  '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' +
                  '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'}
                />
              </svg>
              <span>구글로 로그인</span>
            </a>
          </div>
          <div className={s.formGroup}>
            <a className={s.kakao} href="/auth/kakao">
              <span>카카오톡으로 로그인</span>
            </a>
          </div>
          <strong className={s.lineThrough}>OR</strong>
          <form method="post">
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="usernameOrEmail">
                Username or email address:
              </label>
              <input
                className={s.input}
                id="usernameOrEmail"
                type="text"
                name="email"
                onChange={this.onChange}
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="password"
                onChange={this.onChange}
                name="password"
              />
            </div>
            <div className={s.formGroup}>
              <button
                onClick={this.onSubmitLogin}
                className={s.button}
                type="button"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  payload: state.payload,
});

const mapDispatch = {
  actionPostLogin,
};

Login.defaultProps = {
  user: {
    email: '',
    password: '',
  },
};

Login.propTypes = {
  title: PropTypes.string.isRequired,
  actionPostLogin: PropTypes.func.isRequired,
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
export default connect(mapState, mapDispatch)(withStyles(s)(Login));
