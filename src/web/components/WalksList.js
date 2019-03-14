import React from 'react';
import { Row, Jumbotron } from 'reactstrap';

const WalksList = walks => (
  <div>
    <Row>
      <Jumbotron className="bg-primary text-white">
        <h1>
          'Walks List'
        </h1>
      </Jumbotron>
    </Row>
    <Row>
      <div className="col col-lg-12">
        {walks.walks.map((walk, index) => {
          return (
            <div key={index} className="alert alert-info" role="alert">
              <Row key={index}>
                <div className="col-10">{walk.name}</div>
                <div className="col-2">
                  <button type="button" className="btn btn-warning">Edit</button>
                  <button type="button" className="btn btn-danger">Delete</button>
                </div>
              </Row>
            </div>
          );
        })
        }
      </div>
    </Row>
  </div>
);

export default WalksList;