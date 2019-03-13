import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text, Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';

const styles = StyleSheet.create({
  backdropView: {
    backgroundColor: '#303145',
    padding: 10,
  },
  backgroundView: {
    backgroundColor: '#303145',
  },
});

const Profile = ({ member, logout }) => (
  <Container style={styles.backgroundView}>
    <Content>
      <List>
        {(member && member.email)
          ? (
            <View >
              <Content padder style={styles.backdropView}>
                <Header
                  
                  title={`Hi ${member.firstName},`}
                  content={`You are currently logged in as ${member.email}`}
                />
              </Content>

              <ListItem style={styles.backdropView} onPress={Actions.updateProfile} icon>
                <Left>
                  <Icon name="person-add" />
                </Left>
                <Body>
                  <Text>
                    Update My Profile
                  </Text>
                </Body>
              </ListItem>
              <ListItem style={styles.backdropView} onPress={logout} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Logout
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
          : (
            <View>
              <Content padder style={styles.backdropView}>
                <Header
                  title="Hi there,"
                  content="Please login to gain extra access"
                />
              </Content>

              <ListItem style={styles.backdropView} onPress={Actions.login} icon>
                <Left>
                  <Icon name="power" />
                </Left>
                <Body>
                  <Text>
                    Login
                  </Text>
                </Body>
              </ListItem>
              <ListItem style={styles.backdropView} onPress={Actions.signUp} icon>
                <Left>
                  <Icon name="add-circle" />
                </Left>
                <Body>
                  <Text>
                    Sign Up
                  </Text>
                </Body>
              </ListItem>
              <ListItem style={styles.backdropView} onPress={Actions.forgotPassword} icon>
                <Left>
                  <Icon name="help-buoy" />
                </Left>
                <Body>
                  <Text>
                    Forgot Password
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
        }
        <ListItem style={styles.backdropView} onPress={Actions.locale} icon>
          <Left>
            <Icon name="ios-flag" />
          </Left>
          <Body>
            <Text>
              Change Language
            </Text>
          </Body>
        </ListItem>
      </List>
    </Content>
  </Container>
);
Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;