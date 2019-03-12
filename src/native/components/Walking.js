import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';
import { View, Image, TouchableHighlight } from 'react-native';
import { Container, Text } from 'native-base';
import { Audio } from 'expo'
import Spacer from './Spacer'
import geolib from 'geolib'
// import navigator from ''
import navigation from '../constants/navigation';


class WalkingViewComponent extends React.Component {

    state = { inLocation: false }

    render() {

      navigator.geolocation.getCurrentPosition(result => {

        if (geolib.isPointInCircle(
          { latitude: result.coords.latitude, longitude: result.coords.longitude },
          { latitude: 52.339392, longitude: 4.856258 },
          10
        ) === true) {
          this.setState({inLocation: true})
        } else {
          this.setState({inLocation: false})
        };
      })


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

    playbackObject = new Audio.Sound()
    playbackObject.loadAsync(require('./Oosterpark.mp3'))

    buttonStop = async () => {
      await playbackObject.stopAsync()
      await playbackObject.unloadAsync()
      await playbackObject.loadAsync(require('./Oosterpark.mp3'))
    }

    buttonPlay = async () => {
      await playbackObject.playAsync()
      await playbackObject.loadAsync(require('./Oosterpark.mp3'))
    }

    buttonPause = async () => {
      await playbackObject.pauseAsync()
    }

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
          <Text>Incorrect Location</Text>
          </View>
        )
      }
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
      </Container>

    );
  }};
  export default WalkingViewComponent;