import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="usrname">Username:</label>
      <input type="text" id="usrname" name="usrname" />
      <label htmlFor="pwd">Password:</label>
      <input type="text" id="pwd" name="pwd" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
