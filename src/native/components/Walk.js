import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, List, ListItem, Text,
} from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import MapViewDirections from 'react-native-maps-directions';
import MapView from "react-native-maps";




const WalkView = ({
  error,
  walks,
  walkId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Walk from all walks
  let walk = null;
  if (walkId && walks) {
    console.log(walkId, 'walkId<=========')
    console.log(walks, 'walks<=========')

    walk = walks.find(item => parseInt(item.id, 10) === parseInt(walkId, 10));
  }

  // Walk not found
  if (!walk) return <Error content={ErrorMessages.walk404} />;

  // Build Ingredients listing
  // const ingredients = walk.ingredients.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>
  //       {item}
  //     </Text>
  //   </ListItem>
  // ));

  // Build Method listing
  // const method = walk.method.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>
  //       {item}
  //     </Text>
  //   </ListItem>
  // ));

  const origin = {latitude: 52.359752, longitude: 4.909249};
  const destination = {latitude: 52.359973, longitude: 4.918052};
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
                <Text style={{fontWeight: "bold"}}>Start Address: </Text> {walk.startAddress} {'\n'}{'\n'}
                <Text style={{fontWeight: "bold"}}>City: </Text> {walk.city} {'\n'}{'\n'}
                <Text style={{fontWeight: "bold"}}>Postcode: </Text> {walk.postCode} {'\n'}{'\n'}
                <Text style={{fontWeight: "bold"}}>Country: </Text> {walk.country} {'\n'}{'\n'}
                <Text style={{fontWeight: "bold"}}>Distance: </Text> {walk.length} meters {'\n'}{'\n'}
                <Text style={{fontWeight: "bold"}}>Steps: </Text> {walk.steps} {'\n'}{'\n'}
                <Text style={{fontWeight: "bold"}}>Time: </Text> {walk.time} min {'\n'}
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

        <Card>
          <CardItem header bordered>
            <Text>
              Sound
            </Text>
          </CardItem>
          <CardItem>

          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

WalkView.propTypes = {
  error: PropTypes.string,
  walkId: PropTypes.string.isRequired,
  walks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

WalkView.defaultProps = {
  error: null,
};

export default WalkView;
