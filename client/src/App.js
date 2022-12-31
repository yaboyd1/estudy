import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import ShowPostPage from './pages/ShowPostPage';
import Achievements from './pages/Achievements';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthButton from './components/AuthButton';
import Greeting from './components/Greeting';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';
import './App.css';
import PrivateRouteRequiresAuth from './components/PrivateRouteRequiresAuth';
import ListOfRooms from './pages/ListOfRooms';

function Navigation() {
  const auth = useAuth();
  return (
    <nav className=" navbar navbar-expand-sm navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            className="logo"
            src={require('./imgs/estudy_logo.png')}
            alt=""
          />
        </Link>
        <Greeting />
        <div className="dropdown">
          <button
            className="btn btn-dropdown btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul className="dropdown-menu">
            {auth.isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link">Friends</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/achievements">
                    Achievements
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts/new">
                Forum
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about-us">
                About Us
              </NavLink>
            </li>
            {!auth.isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            )}
            <AuthButton />
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="container-xl text-center p-0">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/achievements"
              element={
                <PrivateRouteRequiresAuth>
                  <Achievements />
                </PrivateRouteRequiresAuth>
              }
            />
            <Route
              path="/posts/new"
              element={
                <PrivateRouteRequiresAuth>
                  {/* In react-router v6 we protect routes like this */}
                  <PostFormPage />
                </PrivateRouteRequiresAuth>
              }
            />
            <Route
              path="/create-room"
              element={
                <PrivateRouteRequiresAuth>
                  <CreateRoom />
                </PrivateRouteRequiresAuth>
              }
            />
            <Route
              path="/room"
              element={
                <PrivateRouteRequiresAuth>
                  <Room />
                </PrivateRouteRequiresAuth>
              }
            />
            <Route
              path="/rooms"
              element={
                <PrivateRouteRequiresAuth>
                  <ListOfRooms />
                </PrivateRouteRequiresAuth>
              }
            />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/posts/:id" element={<ShowPostPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/post/new" element={<PostsListPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
