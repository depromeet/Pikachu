/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import GMap from '../GMap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Map.css';

class Map extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.map} id={'map'}>
            <GMap />
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

export default connect(mapState, mapDispatch)(withStyles(s)(Map));
