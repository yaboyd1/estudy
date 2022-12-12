import React from 'react';
import { Link } from 'react-router-dom';

function ListOfRooms({ name, createdAt, id }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={'/room/' + name}>{name}</Link>
        </div>
        <div className="card-footer small text-muted text-end">{createdAt}</div>
      </div>
    </div>
  );
}

export default ListOfRooms;
