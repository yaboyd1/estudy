import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const AuthButton = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <NavLink className="nav-link" to="/login"></NavLink>;
  }

  return (
    <>
      <div className="login-welcome text-white">
        Welcome,&nbsp;&nbsp;{auth.user.username}!
      </div>
      <NavLink className="session" to="/session">
        <button className="btn btn-primary  text-white">Session</button>
      </NavLink>
    </>
  );
};

export default AuthButton;
