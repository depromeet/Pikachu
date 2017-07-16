/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  state = {
    thumbnail: '//s-media-cache-ak0.pinimg.com/736x/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5--pikachu-halloween-costume-diy-halloween-costumes.jpg',
  }

  componentWillMount() {
    // ㅇ유저 정보가 store에 존재할 경우
    if (this.props.user) { // eslint-disable-line react/prop-types
      this.setState({
        thumbnail: this.props.user.thumb || this.state.thumbnail, // eslint-disable-line react/prop-types, max-len
      });
    }
  }

  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/login">Log in</Link>
        <img className={s.thumb} src={this.state.thumbnail} alt={'thumbnail'} />
      </div>
    );
  }
}
const mapState = state => ({
  user: state.user,
});

const mapDispatch = {

};

export default connect(mapState, mapDispatch)(withStyles(s)(Navigation));
