import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const BookEvent = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://a11-athletic-hub-server.vercel.app/otherEvents?email=${user.email}`, {
                withCredentials: true
            })
                .then(res => setEvents(res.data))
                .catch(err => console.error('Failed to fetch events:', err));
        }
    }, [user]);

    return (
        <div className='max-w-6xl mx-auto p-6'>
            <Helmet>
                <title>Book Event | Athletic Hub</title>
            </Helmet>

            <h2 className="text-4xl font-bold text-center mb-8 text-purple-600">📆 Book an Event</h2>

            {events.length === 0 ? (
                <p className="text-center text-gray-500">No events found by other users.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div key={event._id} className="card bg-base-100 shadow-md border">
                            <figure>
                                <img src={event.image} alt={event.eventName} className="h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{event.eventName}</h2>
                                <p><strong>Date:</strong> {event.eventDate}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Type:</strong> {event.eventType}</p>
                                <p className="text-sm text-gray-500">Created by: {event.creatorEmail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookEvent;