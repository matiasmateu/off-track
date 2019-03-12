import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWalks, getMeals, setError } from '../actions/walks';

class WalkingContainer extends Component {
    static propTypes = {
      Layout: PropTypes.func.isRequired,
    }

  componentDidMount = () => {};

  render = () => {
    const { Layout, walks } = this.props;
    const id = this.props.match.params.id
    return (
      <Layout 
      walks={walks.walks}
      walkId={id}
      />
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
