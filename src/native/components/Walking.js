import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';

const WalkingViewComponent = () => {
  const origin = { latitude: 52.339392, longitude: 4.856258 };
  const destination = { latitude: 52.338894, longitude: 4.856386 };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAqWBhyYy08dnCCA2Uf4Nq8GzHeyZ6NdSU';
  const region = {
    latitude: 52.339306,
    longitude: 4.856268,
    latitudeDelta: 0.0009,
    longitudeDelta: 0.0009,
  };
  const breakpoints = [{ latitude: 52.339666, longitude: 4.855879 }];

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      showsUserLocation
    >
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        mode="walking"
        strokeWidth={3}
        strokeColor="green"
        waypoints={breakpoints}
        followsUserLocation
        showsCompass
        showsMyLocationButton
        loadingEnabled
        optimizeWaypoints
      />
    </MapView>
  );
};
export default WalkingViewComponent;