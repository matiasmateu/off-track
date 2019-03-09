import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import {
  Container, Content, Text, H2
} from 'native-base';
import Spacer from './Spacer';

const About = () => (
  <ImageBackground source={{ uri: 'http://www.cartotalk.com/uploads/monthly_10_2015/post-14-0-92490400-1445603136.png' }} style={styles.backgroundImage}>
    <Container>
      <Content padder>


        <Spacer size={30} />
        <View style={styles.backdropView}>
          <H2>
            MUSIC
      </H2>
          <Spacer size={10} />
          <Text>
            We believe that by adding music to a walking route, going outside is transformed into an experience.
        {' '}
          </Text>
        </View>


        <Spacer size={30} />
        <View style={styles.backdropView}>
          <H2 style={{textAlign: 'right'}}>
            URBAN NATURE
      </H2>
          <Spacer size={10} />
          <Text style={{textAlign: 'right'}}>
            The music in Off-Track adds an extra layer to your surroundings: sometimes it energizes, sometimes it relaxes.
        {' '}
          </Text>
        </View>

        <Spacer size={30} />
        <View style={styles.backdropView}>
          <H2>
            EXERCISE
      </H2>
          <Spacer size={10} />
          <Text>
            Off-Track invites you to go outside. The music in Off-Track adds an extra layer to your surroundings
        {' '}
          </Text>
        </View>

        <Spacer size={30} />
        <View style={styles.backdropView}>
          <H2 style={{textAlign: 'right'}}>
            MEDITATION
      </H2>
          <Spacer size={10} />
          <Text style={{textAlign: 'right'}}>
            Off-Track sets you into motion and aims to reduce stress, anxiety and burn-outs. Whatever you feel, walking with Off-Track creates headspace.
        {' '}
          </Text>
        </View>
      </Content>
    </Container>
  </ImageBackground>
);

var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  backdropView: {
    height: 100,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.75)',
    padding: 10
  },
});

export default About;
