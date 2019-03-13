import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { View, Image, TouchableHighlight, Button, Modal } from 'react-native';
import { Container, Text } from 'native-base';
import { Audio, Location, Permissions } from 'expo'
import Spacer from './Spacer'
import geolib from 'geolib'
import {Marker} from 'react-native-maps'

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

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
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
        20
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
      20
    ) === true) {
      this.setState({ inLocation: true })
    } else {
      this.setState({ inLocation: false })
    };

  }


  render() {

    if (this.state.realWaypoints) {



      const GOOGLE_MAPS_APIKEY = 'AIzaSyAqWBhyYy08dnCCA2Uf4Nq8GzHeyZ6NdSU';
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
                <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose ={ () => {
                  Alert.alert('Modal has been closed')
                }}>
                <View>
                <Text style={{ textAlign: 'center' }}>You Are Not In The Correct Location</Text>
                <Button onPress={this.reloadLocationAsync} title="Reload"></Button>
                <TouchableHighlight 
                onPress = {() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                <Text>Hide Modal</Text>

                </TouchableHighlight>
                </View>
                </Modal>
              
              <TouchableHighlight 
                onPress={() => {
                  this.setModalVisible(true)
                }}>
                <Text>Show Modal</Text>
                </TouchableHighlight>
              </View>
            )
          }
          <MapView
            style={{ flex: 1 }}
            region={region}
            showsUserLocation
          >
          <Marker
          coordinate={origin}
          title='Start Point'
          description='Please go here to go Off-Track'
          />
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              mode="walking"
              strokeWidth={3}
              strokeColor="green"

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
