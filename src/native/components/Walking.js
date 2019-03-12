import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { View, Image, TouchableHighlight } from 'react-native';
import { Container } from 'native-base';
import { Audio } from 'expo';
import Spacer from './Spacer';

class WalkingViewComponent extends React.Component {
  state={
    waypointsExample: [{
      address: 'Wibautstraat',
      direction: 'Start',
      distance: 0,
      latitude: 52.339437,
      longitude: 4.856293,
      picture: 'https://i.imgur.com/k7XEtvr.jpg',
      time: 0,
    }, {
      address: 'Wibauthof',
      direction: 'Turn left',
      distance: 19,
      latitude: 52.339660,
      longitude: 4.855869,
      picture: 'https://i.imgur.com/cpEdz0n.jpg',
      time: 25,
    }, {
      address: 'Mauritskade',
      direction: 'End',
      distance: 120,
      latitude: 52.339517,
      longitude: 4.855043,
      picture: 'https://i.imgur.com/DGbIcKk.jpg',
      time: 0,
    }],
    region: {
      latitude: 52.339306,
      longitude: 4.856268,
      latitudeDelta: 0.0009,
      longitudeDelta: 0.0009,
    },

  };

  componentDidMount() {
    const { walkId, walks } = this.props;
    if (walkId && walks) {
      const walk = walks.find(item => parseInt(item.id, 10) === parseInt(walkId, 10));
      const waypoints = walk.waypoints.map(item => item)
      this.setState({
        waypointsExample: waypoints,
        region: {
          latitude: waypoints[0].latitude,
          longitude: waypoints[0].longitude,
          latitudeDelta: 0.0009,
          longitudeDelta: 0.0009,
        },
      });
    }
  }

  render() {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAqWBhyYy08dnCCA2Uf4Nq8GzHeyZ6NdSU';
    // Creates the Origin of the Walk from the first waypoint
    const { waypointsExample } = this.state;
    const origin = {
      latitude: waypointsExample[0].latitude,
      longitude: waypointsExample[0].longitude,
    };
    // Creates the End of the Walk from the last waypoint
    const { latitude, longitude } = waypointsExample[waypointsExample.length - 1];
    const destination = {
      latitude,
      longitude,
    };
    // Creates an array of waypoints
    const waypoints = waypointsExample.map(waypoint => ({
      latitude: waypoint.latitude,
      longitude: waypoint.longitude,
    }));
    const { region } = this.state;
    return (
      <Container>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          opacity: 0.8,
          top: 0,
          zIndex: 10,
        }}
        >
          <Spacer size={5} />
          <TouchableHighlight onPress={this.buttonPlay}>
            <Image
              style={{ width: 50, height: 50, marginRight: 10 }}
              source={require('./buttons/play.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.buttonPause}>
            <Image
              style={{ width: 50, height: 50, marginRight: 10 }}
              source={require('./buttons/pause.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.buttonStop }>
            <Image
              style={{ width: 50, height: 50, marginRight: 10 }}
              source={require('./buttons/stop.png')}
            />
          </TouchableHighlight>
          <Spacer size={5} />
        </View>
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
            followsUserLocation
            showsCompass
            showsMyLocationButton
            loadingEnabled
            optimizeWaypoints
            waypoints={waypoints}
          />
        </MapView>
      </Container>
    );
  }
}

export default (WalkingViewComponent);
