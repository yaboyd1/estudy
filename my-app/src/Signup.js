import React from 'react';

function Signup() {
  return (
    <div className="form">
      <h1>Sign up</h1>
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
        <input id="submit" type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default Signup;
