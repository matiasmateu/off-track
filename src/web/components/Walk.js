import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';

const WalkView = ({
  error,
  loading,
  walks,
  walkId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Walk from all walks
  let walk = null;
  if (walkId && walks) {
    walk = walks.find(item => parseInt(item.id, 10) === parseInt(walkId, 10));
  }

  // Walk not found
  if (!walk) return <Error content={ErrorMessages.walk404} />;

  // Build Waypoints listing
  const waypoints = walk.waypoints.map(item => (
    <ListGroupItem key={`${item}`}>
      {item}
    </ListGroupItem>
  ));

  // Build Method listing
  const method = walk.method.map(item => (
    <ListGroupItem key={`${item}`}>
      {item}
    </ListGroupItem>
  ));

  return (
    <div>
      <Helmet>
        <title>{walk.title}</title>
      </Helmet>

      <Row>
        <Col sm="12">
          <h1>
            {walk.title}
          </h1>
          <p>
            by
            {' '}
            {walk.author}
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="walk-view-card">
          <Card>
            <CardHeader>
              About this walk
            </CardHeader>
            <CardBody>
              <CardText>
                {walk.fullDescription}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="walk-view-card">
          <Card>
            <CardHeader>
              Ingredients
            </CardHeader>
            <ListGroup className="list-group-flush">
              {ingredients}
            </ListGroup>
          </Card>
        </Col>
        <Col lg="4" className="walk-view-card">
          <Card>
            <CardHeader>
              Method
            </CardHeader>
            <ListGroup className="list-group-flush">
              {method}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to="/walks">
            <i className="icon-arrow-left" />
            {' '}
            Back
          </Link>
        </Col>
      </Row>
    </div>
  );
};

WalkView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  walkId: PropTypes.string.isRequired,
  walks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

WalkView.defaultProps = {
  error: null,
};

export default WalkView;
