import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from './Error';

const WalkListing = ({ error, loading, walks }) => {
  // Error
  if (error) return <Error content={error} />;

  // Build Cards for Listing
  const cards = walks.map(item => (
    <Card key={`${item.id}`}>
      <Link to={`/walk/${item.id}`}>
        <CardImg top src={item.image} alt={item.title} />
      </Link>
      <CardBody>
        <CardTitle>
          {item.title}
        </CardTitle>
        <CardText>
          {item.body}
        </CardText>
        <Link className="btn btn-primary" to={`/walk/${item.id}`}>
          View Walk
          {' '}
          <i className="icon-arrow-right" />
        </Link>
      </CardBody>
    </Card>
  ));

  // Show Listing
  return (
    <div>
      <Row>
        <Col sm="12">
          <h1>
            Walks
          </h1>
          <p>
            The following data is read directly from Firebase.
          </p>
        </Col>
      </Row>
      <Row className={loading ? 'content-loading' : ''}>
        <Col sm="12" className="card-columns">
          {cards}
        </Col>
      </Row>
    </div>
  );
};

WalkListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  walks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

WalkListing.defaultProps = {
  error: null,
};

export default WalkListing;
