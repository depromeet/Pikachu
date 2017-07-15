import React, { PropTypes } from 'react';
import GoogleMap from 'react-google-map';
import GoogleMapLoader from 'react-google-maps-loader';

import config from '../../config';


const Map = ({ googleMaps }) => (
  // GoogleMap component has a 100% height style.
  // You have to set the DOM parent height.
  // So you can perfectly handle responsive with differents heights.
  <div >
    <GoogleMap
      googleMaps={googleMaps}
      // You can add and remove coordinates on the fly.
      // The map will rerender new markers and remove the old ones.
      coordinates={[
        {
          title: 'Toulouse',
          position: {
            lat: 43.604363,
            lng: 1.443363,
          },
          onLoaded: (googleMaps, map, marker) => { // eslint-disable-line no-shadow
            // Set Marker animation
            marker.setAnimation(googleMaps.Animation.BOUNCE);

            // Define Marker InfoWindow
            const infoWindow = new googleMaps.InfoWindow({
              content: `
                <div>
                  <h3>Toulouse<h3>
                  <div>
                    Toulouse is the capital city of the southwestern
                    French department of Haute-Garonne,
                    as well as of the Occitanie region.
                  </div>
                </div>
              `,
            });

            // Open InfoWindow when Marker will be clicked
            googleMaps.event.addListener(marker, 'click', () => {
              infoWindow.open(map, marker);
            });

            // Open InfoWindow directly
            infoWindow.open(map, marker);
          },
        },
      ]}
      center={{ lat: 43.604363, lng: 1.443363 }}
      zoom={8}
      onLoaded={(googleMaps, map) => { // eslint-disable-line no-shadow
        map.setMapTypeId(googleMaps.MapTypeId.SATELLITE);
      }}
    />
  </div>
);

Map.propTypes = {
  googleMaps: PropTypes.object, // eslint-disable-line
};

export default GoogleMapLoader(Map, {
  libraries: ['places'],
  key: 'config.google.map',
});
