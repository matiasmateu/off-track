import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Text} from 'native-base'

import { getWalks, getMeals, setError } from '../actions/walks';

class WalkingContainer extends Component {
    static propTypes = {
      Layout: PropTypes.func.isRequired
    }


  componentDidMount = () => {};

  render = () => {
    const { Layout } = this.props;
    return (
      <Layout />
    );
  }
}

const mapStateToProps = state => ({
  walks: state.walks || {},
});

const mapDispatchToProps = {
  fetchWalks: getWalks,
  fetchMeals: getMeals,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalkingContainer);
