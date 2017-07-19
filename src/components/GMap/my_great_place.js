import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './my_great_place.css';

class MyGreatPlace extends Component {
  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <div className={s.greatPlaceStyle}>
        { this.props.text }
      </div>
    );
  }
}

export default withStyles(s)(MyGreatPlace);
