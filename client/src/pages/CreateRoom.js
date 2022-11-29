import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CreateRoom() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ roomName: '', desc: '' });
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || '/session';

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const login = async (e) => {
    e.preventDefault();
    let { roomName, desc } = data;

    try {
      await auth.authenticate(roomName, desc);
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
            type="text"
            className="form-control p-2 m-2"
            name="roomName"
            placeholder="Room Name"
            value={data.roomName}
            onChange={fieldChanged('roomName')}
          />
          <input
            type="text"
            className="form-control p-2 m-2"
            name="desc"
            placeholder="Room description"
            value={data.desc}
            onChange={fieldChanged('desc')}
          />
          <button type="submit" className="btn text-white ml-auto p-3 mt-4">
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;
