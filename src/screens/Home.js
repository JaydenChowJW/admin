import React, { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useNavigate } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';

const Home = ({ title, description, event_posted, eventid }) => {
  const navigate = useNavigate();
>>>>>>> Stashed changes

  const limitWords = (str, limit) => {
    const words = str.split(' ');
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
  };

  const limitedDescription = limitWords(description, 10);

  const handleItemClick = () => {
    navigate(`/editprogram/${eventid}`);
    console.log('eventIdCheck', eventid);
  };
  

  return (
    <div
      onClick={handleItemClick}
      className='flex-1 block m-2 max-w-sm p-4 md:p-6 bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
    >
      <h5 className='mb-2 text-xl md:text-2xl font-bold tracking-tight text-black'>{title}</h5>
      <p className='font-normal text-sm md:text-base text-gray-500 mb-4'>{limitedDescription}</p>
      <div className='bg-teal-700 text-white rounded-full py-1 px-2 absolute bottom-2 right-2 h-6 md:h-8'>
        <p className='text-xs md:text-sm'>{event_posted}</p>
        <a href={'editprogram?eventid=' + eventid}/>
      </div>
    </div>
  );
};

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const rows = [];
  const cardsPerRow = 4;

  for (let i = 0; i < events.length; i += cardsPerRow) {
    const row = events.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='sm:flex sm:flex-wrap justify-center'>
        {row.map((event, index) => (
          <Home
            key={index}
            id={event.eventid}
            title={event.title}
            description={event.description}
            event_posted={event.time_start}
            eventid={event.eventid} // Pass eventid to Home component
          />
        ))}
      </div>
    );
  }
<<<<<<< Updated upstream
  const navigate = useNavigate();
  const handleAddEventClick = () => {
    navigate('/addprogram'); // Redirect to the specified route
  };
  return (
    <>
      {/* Add Event Button */}
      <Link to="/add-event">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md m-2"
        onClick={handleAddEventClick}>
          Add Event
          
        </button>
      </Link>
=======

  const handleAddEventClick = () => {
    navigate('/addprogram');
  };

  return (
    <>
      {/* Add Event Button */}
      <button onClick={handleAddEventClick} className="bg-green-500 text-white px-4 py-2 rounded-md m-2">
        Add Event
      </button>
>>>>>>> Stashed changes
      {/* Events List */}
      {rows}
    </>
  );
};

export default EventsList;
