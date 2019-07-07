import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { View, Image, TouchableHighlight, Button } from 'react-native';
import { Container, Text } from 'native-base';
import { Audio, Location, Permissions } from 'expo'
import Spacer from './Spacer'
import geolib from 'geolib'
import {Marker, PROVIDER_GOOGLE } from 'react-native-maps'

mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

class WalkingViewComponent extends React.Component {

  state = {
    realWaypoints: [{
      latitude: 0,
      longitude: 0,
    }],
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    inLocation: false,
    audio: ''
  };

  componentDidMount() {
    // This is going to render tha Map
    const { walkId, walks } = this.props;
    if (walkId && walks) {
      const walk = walks.find(item => parseInt(item.id, 10) === parseInt(walkId, 10));
      const waypoints = walk.waypoints.map(item => item)

          // This will load the track for User and check location
      playbackObject = new Audio.Sound()
      playbackObject.loadAsync({uri: walk.audio})
      
      this.setState({
        audio: walk.audio,
        realWaypoints: waypoints,
        region: {
          latitude: waypoints[0].latitude,
          longitude: waypoints[0].longitude,
          latitudeDelta: 0.0009,
          longitudeDelta: 0.0009,
        },
      });
      this.checkLocationAsync()

    }
    // this.checkLocationAsync()
  }

  checkLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      throw new Error('Location permission not granted')
    } else {

      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});


      if (geolib.isPointInCircle(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: this.state.realWaypoints[0].latitude, longitude: this.state.realWaypoints[0].longitude },
        200
      ) === true) {
        this.setState({ inLocation: true })
      } else {
        this.setState({ inLocation: false })
      };

    }
  }

  buttonStop = async () => {
    await playbackObject.stopAsync()
    await playbackObject.unloadAsync()
    await playbackObject.loadAsync({uri: this.state.audio})

  }

  buttonPlay = async () => {
    await playbackObject.playAsync()
    await playbackObject.loadAsync({uri: this.state.audio})
  }

  buttonPause = async () => {
    await playbackObject.pauseAsync()
  }

  reloadLocationAsync = async () => {

    let location = await Location.getCurrentPositionAsync({});

    if (geolib.isPointInCircle(
      { latitude: location.coords.latitude, longitude: location.coords.longitude },
      { latitude: this.state.realWaypoints[0].latitude, longitude: this.state.realWaypoints[0].longitude },
      200
    ) === true) {
      this.setState({ inLocation: true })
    } else {
      this.setState({ inLocation: false })
    };

  }


  render() {

    if (this.state.realWaypoints) {



      const GOOGLE_MAPS_APIKEY = '';
      // Creates the Origin of the Walk from the first waypoint
      const { realWaypoints } = this.state;
      const origin = {
        latitude: realWaypoints[0].latitude,
        longitude: realWaypoints[0].longitude,
      };
      // Creates the End of the Walk from the last waypoint
      const { latitude, longitude } = realWaypoints[realWaypoints.length - 1];
      const destination = {
        latitude,
        longitude,
      };
      // Creates an array of waypoints
      const waypoints = realWaypoints.map(waypoint => ({
        latitude: waypoint.latitude,
        longitude: waypoint.longitude,
      }));
      const { region } = this.state;
      
      return (
        <Container>
          {(this.state.inLocation)
            ? (
              <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', opacity: 0.8, top: 0, zIndex: 10 }}>
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
                <TouchableHighlight onPress={this.buttonStop}>
                  <Image
                    style={{ width: 50, height: 50, marginRight: 10 }}
                    source={require('./buttons/stop.png')}
                  />
                </TouchableHighlight>
                <Spacer size={5} />
              </View>
            )
            : (
              <View>
                <Text style={{ textAlign: 'center', backgroundColor: '#22262E' }}>You Are Not In The Correct Location</Text>
                <Button onPress={this.reloadLocationAsync} title="Reload"></Button>
              </View>
            )
          }
          <MapView
            style={{ flex: 1 }}
            region={region}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            showsUserLocation
          >
          {/* <Marker
          coordinate={origin}
          title='Start Point'
          description='Please go here to go Off-Track'
          /> */}
          {this.state.realWaypoints.map((waypoint,index)=>{

          return(<MapView.Marker
          key={index}
          coordinate={
            {latitude: waypoint.latitude,
            longitude: waypoint.longitude}
          }
          title={waypoint.address}
          description={waypoint.direction}
          
          />
          )
          })}
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              mode="walking"
              strokeWidth={3}
              strokeColor="white"

              waypoints={waypoints}

              followsUserLocation
              showsCompass
              showsMyLocationButton
              loadingEnabled
              optimizeWaypoints
            />
          </MapView>
        </Container>
      );
    } else {
      return <View><Text>loading</Text></View>
    }
  }
}

export default (WalkingViewComponent);
