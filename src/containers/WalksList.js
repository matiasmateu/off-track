import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWalks } from '../actions/walks';

class WalksList extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    errorMessage: null,
  }

  componentDidMount() {
    this.props.fetchWalks();
  }

  render = () => {
    const {
      Layout,
      isLoading,
    } = this.props;
    const { errorMessage } = this.state;
    return (
      <Layout
        loading={isLoading}
        error={errorMessage}
        walks={this.props.walksList}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.status.loading || false,
  walksList : state.walks.walks,
});

export default connect(mapStateToProps, { fetchWalks })(WalksList);
