/* eslint-disable react/prop-types */
import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
class GMap extends React.Component {
  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 },
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <GoogleMap
        apiKey={'AIzaSyArteKgEKnAuZKKDA7rhUA7dvaNWslRsEU'} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}
      >
        <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
        <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
      </GoogleMap>
    );
  }

}


export default GMap;
