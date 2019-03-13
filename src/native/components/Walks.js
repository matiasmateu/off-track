import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, TouchableOpacity, RefreshControl, Image, StyleSheet
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const WalkListing = ({
  error,
  loading,
  walks,
  reFetch,
}) => {

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // const keyExtractor = item => item.id.toString();
  // console.log('item:', item);
 

  const onPress = item => Actions.walk({ match: { params: { id: Number(item.id) } } });

  return (
    <Container style={styles.backgroundView}>
      <Content padder>
        <Header
          title="Overview"
          content="Experience a walk or get lost in one. Choose your route below to get started."
        />

        <FlatList
          numColumns={1}
          data={walks}
          style={styles.backgroundView}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }} >
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody style={styles.cardView}>
                <Body>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>
                    {item.name}
                  </Text>
                  <Spacer size={15} />
                  <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(item)}
                  >
                    <Text style={{ color: 'black' }}>
                      View Walk
                    </Text>
                  </Button>
                  <Spacer size={20} />
                </Body>
              </CardItem>
            </Card>
          )}
          // keyExtractor={keyExtractor}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          )}
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

WalkListing.propTypes = {
  error: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  walks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

WalkListing.defaultProps = {
  error: null,
  reFetch: null,
};

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: '#303145',
  },
  cardView: {
    backgroundColor: '#868DB2'
  }
});

export default WalkListing;
