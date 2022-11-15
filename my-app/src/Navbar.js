function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={require('./imgs/estudy_logo.png')} alt="logo" />
      </div>
      <div className="links">
        <a href="/" className="home">
          Home
        </a>
        <a href="/" className="login">
          Login
        </a>
        <a href="/" className="sign-up">
          Sign Up
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
