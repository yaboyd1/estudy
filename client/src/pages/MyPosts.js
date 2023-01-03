import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import MicroPostCard from '../components/MicroPostCard';
import { useAuth } from '../context/AuthContext';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userId = useAuth().user.id;

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch('/api/micro_posts/my-posts/' + userId);
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
  if (posts.length === 0) noPosts = 'You did not made any posts yet!';
  if (error) return <ErrorAlert details="Failed to fetch all micro posts" />;
  if (loading) return <LoadingSpinner />;

  console.log(posts);

  return (
    <>
      <div>{noPosts}</div>
      <h1 className="text-white mt-3">Your posts</h1>);
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

export default MyPosts;
