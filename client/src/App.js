import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import ShowPostPage from './pages/ShowPostPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './context/AuthContext';
import AuthButton from './components/AuthButton';
import Greeting from './components/Greeting';
import Home from './pages/Home';

import './App.css';
import PrivateRouteRequiresAuth from './components/PrivateRouteRequiresAuth';

function Navigation() {
  return (
    <nav className=" navbar navbar-expand-sm navbar-dark mb-3">
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts/new">
                Create a Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about-us">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>

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
        <div className="container-xl text-center">
          <div className="row justify-content-center">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/posts/new"
                element={
                  <PrivateRouteRequiresAuth>
                    {/* In react-router v6 we protect routes like this */}
                    <PostFormPage />
                  </PrivateRouteRequiresAuth>
                }
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/posts/:id" element={<ShowPostPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/" element={<PostsListPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
