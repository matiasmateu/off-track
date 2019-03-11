import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, View, Text, Left, Icon, ListItem
} from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import MapViewDirections from 'react-native-maps-directions';
import MapView from "react-native-maps";
import { Actions } from 'react-native-router-flux';


const WalkView = ({ error, walks, walkId, member }) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Walk from all walks
  let walk = null;
  if (walkId && walks) {
    walk = walks.find(item => parseInt(item.id, 10) === parseInt(walkId, 10));
  }

  // Walk not found
  if (!walk) return <Error content={ErrorMessages.walk404} />;

  const origin = { latitude: 52.359752, longitude: 4.909249 };
  const destination = { latitude: 52.359973, longitude: 4.918052 };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAqWBhyYy08dnCCA2Uf4Nq8GzHeyZ6NdSU';

  return (
    <Container>
      <Content padder>
        <Image source={{ uri: walk.picture }} style={{ height: 300, width: null, flex: 1 }} />

        <Spacer size={25} />
        <H3>
          {walk.name}
        </H3>
        <Text>
          by
          {' '}
          {walk.author}
        </Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>
              About this walk
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                {walk.fullDescription}
              </Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>
              Details
            </Text>
          </CardItem>
          <CardItem>
            <Content>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Start Address: </Text> {walk.startAddress} {'\n'}{'\n'}
                <Text style={{ fontWeight: "bold" }}>City: </Text> {walk.city} {'\n'}{'\n'}
                <Text style={{ fontWeight: "bold" }}>Postcode: </Text> {walk.postCode} {'\n'}{'\n'}
                <Text style={{ fontWeight: "bold" }}>Country: </Text> {walk.country} {'\n'}{'\n'}
                <Text style={{ fontWeight: "bold" }}>Distance: </Text> {walk.length} meters {'\n'}{'\n'}
                <Text style={{ fontWeight: "bold" }}>Steps: </Text> {walk.steps} {'\n'}{'\n'}
                <Text style={{ fontWeight: "bold" }}>Time: </Text> {walk.time} min {'\n'}
              </Text>
            </Content>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>
              Map
            </Text>
          </CardItem>
          <CardItem>
            <MapView >
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                mode={'walking'}
              />
            </MapView>
          </CardItem>
        </Card>

        <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <CardItem header bordered>
            {(member && member.email)
              ? (
                <View>
                  <Content padder>
                    <Text>BUTTON</Text>
                  </Content>
                </View>
              )
              : (

                <View>

                <Content><Text style={{textAlign: 'center'}}>To go Off-Track, please:</Text></Content>


                <View style={{ flexDirection: 'row' }}>

                  <ListItem onPress={Actions.signUp} icon>
                    <Left>
                      <Icon name="add-circle" />
                      <Text >
                        Sign Up
                      </Text>
                    </Left>
                  </ListItem>


                  <ListItem onPress={Actions.login} style={{}} icon>
                    <Left>
                      <Icon name="power" />
                      <Text>
                        Login
                      </Text>
                    </Left>
                  </ListItem>
                </View>
                </View>
              )
            }
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

WalkView.propTypes = {
  error: PropTypes.string,
  walkId: PropTypes.number.isRequired,
  walks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  member: PropTypes.shape({})
};

WalkView.defaultProps = {
  error: null,
  member: {},
};

export default WalkView;
