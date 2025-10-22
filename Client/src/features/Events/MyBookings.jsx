import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import MyBooking from './MyBooking';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import BookingCard from './BookingCard';

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [isTableView, setIsTableView] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://a11-athletic-hub-server.vercel.app/bookings?email=${user.email}`, {
                withCredentials: true
            })
                .then(res => setBookings(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    return (
        <div className='max-w-6xl mx-auto p-6 mb-16'>
            <Helmet>
                <title>My Bookings | Athletic Hub</title>
            </Helmet>

            <h2 className="text-4xl font-bold text-center mb-8">🎟️ My Bookings</h2>

            {/* Toggle Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsTableView(!isTableView)}
                    className="btn btn-outline btn-sm"
                >
                    {isTableView ? 'Switch to Card View' : 'Switch to Table View'}
                </button>
            </div>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">You have no bookings yet.</p>
            ) : (
                isTableView ? (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra border border-base-300">
                            <thead className="bg-purple-100 text-purple-800">
                                <tr>
                                    <th>#</th>
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <MyBooking
                                        key={booking._id}
                                        index={index}
                                        booking={booking}
                                        onDeleteSuccess={(deletedId) => {
                                            setBookings(prev => prev.filter(b => b._id !== deletedId));
                                        }}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map(booking => (
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                                onDeleteSuccess={(deletedId) => {
                                    setBookings(prev => prev.filter(b => b._id !== deletedId));
                                }}
                            />
                        ))}
                    </div>
                )
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default MyBookings;