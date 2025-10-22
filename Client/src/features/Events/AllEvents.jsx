import React, { useEffect, useState } from 'react';
import SingleEvent from './SingleEvent';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';

const AllEvents = () => {
    const [allEventsData, setAllEventsData] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("https://a11-athletic-hub-server.vercel.app/events")
            .then(res => {
                setAllEventsData(res.data);
                setFilteredEvents(res.data); // initialize
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch events", err);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filtered = allEventsData.filter(event =>
            event.eventName.toLowerCase().includes(searchText.toLowerCase()) ||
            event.location.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-10 mt-26 w-10/11 sm:w-full mx-auto'>
            <Helmet>
                <title>All Events | Athletic Hub</title>
            </Helmet>

            <h1 className='text-4xl font-bold text-center'>All <span className='text-purple-700'>Events </span>Is Here</h1>
            <p className='text-gray-600 text-center mt-2 mb-10'>There is available all the events</p>

            {/* Search Bar */}
            <div className="flex justify-center items-center gap-3 mb-10">
                <input
                    type="text"
                    placeholder="Search by name or location"
                    className="input input-bordered w-full max-w-sm"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>

            {/* Event Grid */}
            {
                filteredEvents.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {
                            filteredEvents.map(event => (
                                <SingleEvent key={event._id} event={event} />
                            ))
                        }
                    </div>
                ) : (
                    <p className='text-center text-gray-500'>No events found for your search.</p>
                )
            }

        </div>
    );
};

export default AllEvents;