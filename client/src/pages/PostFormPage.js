import React, { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import { useAuth } from '../context/AuthContext';

function PostFormPage() {
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch('/api/micro_posts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Server error while creating a new post', error);
      setError(true);
    }
  };

  if (success) return <Navigate to="./posts" />;

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="row w-50">
        {error && <ErrorAlert details={'failed to save the content'} />}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Ask Question..."
              value={content}
              className="form-control"
              onChange={handleContentChange}
              autoFocus
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <div className="mt-3">
          <NavLink to="./posts">Want to see forum questions?</NavLink>
        </div>
      </div>
    </div>
  );
}

export default PostFormPage;
