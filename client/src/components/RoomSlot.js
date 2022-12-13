import React from 'react';
import { Link } from 'react-router-dom';

function RoomSlot({ name, createdAt, id }) {
  const onClickLink = async () => {
    try {
      let response = await fetch(`/api/rooms/${id}`, {
        method: 'put',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'enter',
        }),
      });
      console.log(response);
    } catch (error) {
    }
  }
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link onClick={onClickLink} to={'/room/' + name}>{name}</Link>
        </div>
        <div className="card-footer small text-muted text-end">{createdAt}</div>
      </div>
    </div>
  );
}

export default RoomSlot;
