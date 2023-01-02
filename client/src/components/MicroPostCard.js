import React from 'react';
import { Link } from 'react-router-dom';

function MicroPostCard({ content, createdAt, id, username }) {
  return (
    <div className="mt-4 mx-auto col-10 col-md-8 col-lg-7">
      <Link className="card-text" to={'./post/' + id}>
        <div className="card mb-4 shadow">
          <div className="card-body card-text">
            <span>{username}</span>:    
            {content}
          </div>
          <div className="mt-4 card-footer small text-center">
            {new Date(createdAt).toLocaleTimeString('en-US', {
              timeZone: 'EST',
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MicroPostCard;
