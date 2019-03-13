/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Location, Permissions } from 'expo';
import { Animated, Easing, Dimensions, View, StyleSheet } from 'react-native';

// Device dimensions so we can properly center the images set to 'position: absolute'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: '#263544',
    fontSize: 80,
    transform: ([{ translateY: -(deviceHeight / 2 - (deviceHeight / 2 - 10) / 2) - 50 }]),
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  arrowContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  arrow: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    left: deviceWidth / 2 - (deviceWidth / 7) / 2,
    top: deviceHeight / 2 - (deviceWidth / 7) / 2,
    opacity: 0.9,
  },
});

class Compass extends Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
    this.state = {
      errorMessage: null,
      heading: null
    };
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  componentWillUpdate() {
    this.spin();
  }

  _getLocationAsync = async () => {
    // Checking device location permissions
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      Location.watchHeadingAsync(async (obj) => {
        this.setState({newDir:await this.calcNewCompass(52.339413,4.857316,52.339415,4.857698)})
        let heading = obj.magHeading ;   

        this.setState({ heading });
      });
    }
  };

   async calcNewCompass(lat1,long1,lat2,long2){

    let angleRadians = Math.atan2(long2-long1,lat2-lat1)
    let angleDeg = Math.atan2(long2-long1,lat2-lat1)*180/Math.PI


    // dy = lat2 - lat1
    // dx = Math.cos(Math.PI/180*lat1)*(long2-long1)
    // angle = Math.atan2(dy,dx)

    return Math.abs(angleDeg)
  }

  spin() {
    const start = JSON.stringify(this.spinValue);
    const heading = Math.round((this.state.heading + this.state.newDir) % 360);

    let rot = +start;
    const rotM = rot % 360;

    if (rotM < 180 && (heading > (rotM + 180))) {rot -= 360;}
    if (rotM >= 180 && (heading <= (rotM - 180))) {rot += 360;}
    rot += (heading - rotM);

    Animated.timing(
      this.spinValue,
      {
        toValue: rot,
        duration: 300,
        easing: Easing.easeInOut,
      },
    ).start();
  }


  render() {
    const LoadingText = 'Loading...';
    let display = LoadingText;

    if (this.state.errorMessage) {display = this.state.errorMessage;}

    const spin = this.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['-0deg', '-360deg'],
    });

    display = Math.round(JSON.stringify(this.spinValue));

    if (display < 0) {display += 360;}
    if (display > 360) {display -= 360;}
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {<Animated.Image
            resizeMode="contain"
            source={require('../../images/arrow.png')}
            style={{
              width: deviceWidth - 10,
              height: deviceHeight / 2 - 10,
              left: deviceWidth / 2 - (deviceWidth - 10) / 2, 
              top: deviceHeight / 2 - (deviceHeight / 2 - 10) / 2,
              transform: [{ rotate: spin }],
            }}
          />}
        </View>
        <View style={styles.arrowContainer} />
      </View>
    );
  }
}

export default Compass;
