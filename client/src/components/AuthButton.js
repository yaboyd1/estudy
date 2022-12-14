import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return (
      <NavLink className="nav-link" to="/login">
        <button className="btn btn-login btn-primary">Login</button>
      </NavLink>
    );
  }

  const logout = () => {
    auth.signout().then(() => navigate('/'));
  };

  return (
    <div className="login">
      <button className="btn btn-login btn-primary" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AuthButton;
