import React, { useContext, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const EventDetails = () => {
    const { user } = useContext(AuthContext);

    const { id } = useParams()
    const eventData = useLoaderData();
    const { _id, image, eventName, eventDate, location, eventType, description } = eventData;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBooking = () => {
        const currentEvent = { ...eventData };  // [eventData from useLoaderData()]
        currentEvent.user_email = user.email;
        currentEvent.eventId = id;
        delete currentEvent._id;

        axios.post('https://a11-athletic-hub-server.vercel.app/bookings', currentEvent, {
            withCredentials: true
        })
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Event Booking Successful!");
                }
            })
            .catch(err => {
                if (err.response?.status === 400 && err.response?.data?.message === "Already booked this event") {
                    toast.error("❌ You've already booked this event!");
                } else {
                    console.error('Booking Failed', err);
                    toast.error("Event Booking Failed! Please try again.");
                }
            });
    };


    return (
        <div className='lg:w-2/4 mx-auto my-10 mt-26'>
            <Helmet>
                <title>Event Details | {eventName} | Athletic Hub</title>
            </Helmet>

            <div className="card bg-base-100 mb-10 border-b-2 border-l border-purple-300 shadow-lg hover:shadow-xl hover:shadow-purple-200">
                <figure>
                    <img
                        src={image}
                        alt="Event"
                        className='w-full h-full object-cover'
                    />
                </figure>
                <div className="card-body">
                    <div className='pace-y-4'>
                        <h3 className="card-title font-bold text-3xl">{eventName}</h3>
                    </div>

                    <div className='flex flex-col mt-2 md:flex-row font-medium text-lg space-y-2'>
                        <p>{eventType}</p>
                        <p className='font-medium'>{eventDate}</p>
                    </div>

                    <h3 className='font-medium text-lg'>{location}</h3>

                    <p className='text-lg text-gray-500 mt-3'>{description}</p>

                    <div className='space-y-2 mt-4'>
                        <p className='text-lg font-medium'>Participant Email: <span className='text-purple-700'>{user?.email}</span></p>
                        <p className='text-lg font-medium'>Participant Name: <span className='text-purple-700'>{user?.displayName}</span></p>
                    </div>

                    <button
                        onClick={handleBooking}
                        className='btn bg-purple-600 hover:bg-purple-700 text-white font-semibold mt-6'>
                        Book Now
                    </button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default EventDetails;