import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MicroPostCard({ content, createdAt, id }) {
  const userId = useAuth().user.id;
  const username = useAuth().user.username;
  return (
    <div className="mt-4 mx-auto col-10 col-md-8 col-lg-7">
      <Link className="card-text" to={'/posts/' + id}>
        <div className="card mb-4 shadow">
          <div className="card-body card-text">
            <span>{username}</span>:    
            {content}
          </div>
          <div className="mt-4 card-footer small text-center">
            {/*hour*/ createdAt.split('T')[1].split(':').slice(0, 1)}:
            {/*minute*/ createdAt.split('T')[1].split(':').slice(1, 2)}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MicroPostCard;
