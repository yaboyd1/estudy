import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';

function CreateRoom() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ roomName: '', url: '' });
  const [roomId, setroomId] = useState();
  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch('/api/rooms', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.roomName,
        }),
      });
      const body = await response.json();
      if (response.ok) {
        setroomId(body.id);
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Server error while creating room', error);
      setError(true);
    }
  };
  if (success) return <Navigate to={`/room/${data.roomName}?roomid=${roomId}`} />;

  return (
    <div className="row justify-content-center mt-3">
      <div className="col-10 col-md-8 col-lg-7">
        {error && <ErrorAlert details={'Failed to create room'} />}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control p-2 m-2"
            name="roomName"
            placeholder="Room Name"
            value={data.roomName}
            onChange={fieldChanged('roomName')}
          />
          <button type="submit" className="btn text-white p-3 mt-4">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
