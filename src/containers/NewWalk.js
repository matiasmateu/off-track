import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWalk } from '../actions/walks';

class NewWalk extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    errorMessage: null,
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data)
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  render = () => {
    const {
      Layout,
      isLoading,
    } = this.props;

    const { errorMessage } = this.state;
    console.log("Inside render of Container New Walk");
    return (
      
      <Layout
        loading={isLoading}
        error={errorMessage}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onFormSubmit: addWalk,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewWalk);
