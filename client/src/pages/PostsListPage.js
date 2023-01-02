import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import MicroPostCard from '../components/MicroPostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch('/api/micro_posts');
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

  let noPosts = '';
  if (posts.length === 0) noPosts = 'No Posts made yet!';
  if (error) return <ErrorAlert details="Failed to fetch all micro posts" />;
  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="text-white text-center">{noPosts}</div>
      <div className="text-start">
        <button className="arrow-back mt-3 bg-light rounded-5">
          <NavLink className="nav-link" to="/forum">
            <img src={require('../imgs/back_arrow.png')} alt="go back" />
          </NavLink>
        </button>
      </div>
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          {posts.reverse().map((entryData) => (
            <MicroPostCard
              {...entryData}
              key={entryData.id}
              username={entryData['User'].username}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PostsListPage;
