import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpv-RYHHGNWMXcRlphLeU8GnmblpWZaQk&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px`, width: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: 50.45466, lng: 30.5238 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: 50.43832687, lng: 30.59257865 }} />
    )}
  </GoogleMap>
));

export default MyMapComponent;
