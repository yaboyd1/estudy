import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const login = async (e) => {
    e.preventDefault();
    let { username, password } = data;

    try {
      await auth.authenticate(username, password);
      // setRedirectToReferrer(true); // used in react-router v5
      // in react-router v6 navigate changes the pages directly.
      // comment from official docs example:
      //    Send them back to the page they tried to visit when they were
      //    redirected to the login page. Use { replace: true } so we don't create
      //    another entry in the history stack for the login page.  This means that
      //    when they get to the protected page and click the back button, they
      //    won't end up back on the login page, which is also really nice for the
      //    user experience.
      navigate(from, { replace: true });
    } catch (error) {
      setError(true);
    }
  };

  let errorMessage = '';
  if (error) {
    errorMessage = (
      <div className="alert alert-danger" role="alert">
        Login Failed
      </div>
    );
  }

  return (
    <div className="col-10 col-md-8 col-lg-7">
      <form onSubmit={login}>
        <div className="form-row">
          {errorMessage}
          <input
            type="username"
            className="form-control p-2 m-2"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={fieldChanged('username')}
          />
          <input
            type="password"
            className="form-control p-2 m-2"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={fieldChanged('password')}
          />
          <button type="submit" className="btn btn-primary ml-auto">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
