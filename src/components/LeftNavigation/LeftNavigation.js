/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LeftNavigation.css';

class LeftNavigation extends React.Component {
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
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.lnb}>
            hello
          </div>
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  user: state.user,
});

const mapDispatch = {

};

export default connect(mapState, mapDispatch)(withStyles(s)(LeftNavigation));
