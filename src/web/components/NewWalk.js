import React from 'react';
import { Row, Jumbotron } from 'reactstrap';

const NewWalk = () => (
  <div>
    <Row>
      <Jumbotron className="bg-primary text-white">
        <h1>
          New Walk Page
        </h1>
      </Jumbotron>
    </Row>
    <Row>
      <form>
        <div className="form-group">
          <label>Walk Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Walk Name" />
        </div>
        <div className="form-group">
          <label>City</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Amsterdam</option>
            <option>Rotterdam</option>
            <option>Oslo</option>
          </select>
        </div>
        <div className="form-group">
          <label >Audio File</label>
          <input type="file" className="form-control-file" id="exampleFormControlFile1" />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Author" />
        </div>
        <div className="form-group">
          <label>Short Description</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Short Description" />
        </div>
        <div className="form-group">
          <label >Image</label>
          <input type="file" className="form-control-file" id="exampleFormControlFile1" />
        </div>
        <button>Add Walk</button>
      </form>
    </Row>
  </div>
);

export default NewWalk;
