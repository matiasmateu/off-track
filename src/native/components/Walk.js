import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, View, Text, Left, Icon, ListItem, Button
} from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
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
            <Text style={{  textShadowColor: 'gray', textShadowOffset: {width: -1, height: 1},textShadowRadius: 1}}>
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
            <Text style={{  textShadowColor: 'gray', textShadowOffset: {width: -1, height: 1},textShadowRadius: 1}}>
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
            <Text style={{  textShadowColor: 'gray', textShadowOffset: {width: -1, height: 1},textShadowRadius: 1}}>
              Map
            </Text>
          </CardItem>
          <View style={{justifyContent: 'center'}}>
            < Image source={{ uri: walk.mapImage }} style={{ height: 250, width: 350, marginLeft: 'auto', marginRight: 'auto' }} />
          </View>
        </Card>

        <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <CardItem header bordered>
            {(member && member.email)
              ? (
                <View>
                  <Content padder>
                    <Button onPress={Actions.walking}>
                      <Text style={{color: 'black'}}>
                        Start this walk!
                      </Text>
                    </Button>
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
