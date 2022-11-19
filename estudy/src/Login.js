import React from 'react';

function Login() {
  return (
    <div className="form">
      <h1 className="text-3xl">Sign in</h1>
      <form>
        <br />
        <label htmlFor="usrname">Username</label>
        <br />
        <input type="text" id="usrname" name="usrname" />
        <br />
        <br />
        <label htmlFor="pwd">Password</label>
        <br />
        <input type="password" id="pwd" name="pwd" />
        <br />
        <br />
        <input id="submit" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
