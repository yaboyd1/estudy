import React, { useState, useEffect } from 'react';
import MicroPostCard from '../components/MicroPostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { useParams, NavLink } from 'react-router-dom';

function ShowPostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  let params = useParams();
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch('/api/micro_posts/' + params.id);
        let postData = await response.json();
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching /api/micro_posts/' + params.id, error);
        setError(true);
      }
    }

    getData();

    return () => {
      // clean up function
    };
  }, [params.id]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch('/api/micro_post_responses', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          microPostId: params.id,
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

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch('/api/micro_post_responses/' + params.id);
        let allPosts = await response.json();
        setPosts(allPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all micro_posts', error);
        setError(true);
      }
    }

    getData();

    return () => {
      // clean up function
    };
  }, []);

  if (success) return window.location.reload();

  if (error)
    return (
      <ErrorAlert details={'Micro post with id=' + params.id + ' not found'} />
    );
  if (loading) return <LoadingSpinner />;

  console.log(posts);

  return (
    <>
      <div className="text-start">
        <button className="arrow-back mt-3 bg-light rounded-5 text-start  ">
          <NavLink className="nav-link" to="/forum/posts">
            <img src={require('../imgs/back_arrow.png')} alt="go back" />
          </NavLink>
        </button>
      </div>
      <MicroPostCard {...post} username={post['User'].username} onPost={true} />
      <div className="d-flex justify-content-center mt-4">
        <div className="row w-50">
          {error && <ErrorAlert details={'failed to save the content'} />}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Send..."
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
          {posts.reverse().map((post) => {
            return (
              <MicroPostCard
                {...post}
                key={post.id}
                username={post['User'].username}
                onPost={true}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ShowPostPage;
