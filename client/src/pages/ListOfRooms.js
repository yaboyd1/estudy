import React, { useState, useEffect } from 'react';
import RoomSlot from '../components/RoomSlot';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

function ListOfRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch('/api/rooms');
        let allRooms = await response.json();
        setRooms(allRooms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms', error);
        setError(true);
      }
    }

    getData();

    return () => {
      // clean up function
    };
  }, []);

  let noRoom = '';
  if (rooms.length === 0) {
    noRoom = 'No one made a room yet!';
  }
  if (error) return <ErrorAlert details="Failed to fetch rooms  " />;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-fluid text-center mt-4 rounded">
      <div className="text-white">{noRoom}</div>
      <div className="rooms row justify-content-center border w-50 mx-auto border border-4">
        {rooms.map((entryData) => (
          <RoomSlot
            {...entryData}
            desc={entryData.description}
            key={entryData.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ListOfRooms;
