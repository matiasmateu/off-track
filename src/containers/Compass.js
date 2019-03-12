import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Compass extends Component {
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

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Compass);
