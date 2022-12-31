import React from 'react';
import { Link } from 'react-router-dom';

function RoomSlot({ name, desc, id }) {
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
    } catch (error) {}
  };

  //create link with the room id
  const path = {
    pathname: `/room/${name}`,
    search: `roomid=${id}`,
  };

  return (
    <div className="rooms d-flex mx-auto col-10 col-md-8 col-lg-7 bg-light w-100">
      <div className="mx-auto card mb-4 mt-4 border">
        <Link className="card-text" onClick={onClickLink} to={path}>
          <div className="card-body card-text text-center">
            <span>{name}</span>
          </div>
        </Link>
        <div className="card-footer small text-end">{desc}</div>
      </div>
    </div>
  );
}

export default RoomSlot;
