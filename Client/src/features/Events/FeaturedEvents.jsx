import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import FeaturedEvent from './FeaturedEvent';
import Loading from '../../components/Loading/Loading';

const FeaturedEvents = () => {
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://a11-athletic-hub-server.vercel.app/featured-events')
            .then(res => res.json())
            .then(data => {
                setEventsData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <Loading></Loading>
    }

    return (
        <div className='my-32'>
            <h1 className='text-4xl font-bold text-center'><span className='text-cyan-600'>Featured</span> Events</h1>
            <p className='text-gray-600 text-center mt-2 mb-10'>There is Featured 6 Events by date available</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    eventsData.map(event => <FeaturedEvent
                        key={event._id}
                        event={event}
                    ></FeaturedEvent>)
                }
            </div>

            {/* button */}
            <div className='text-center mt-16'>
                <Link to="/allEvents">
                    <button className='btn btn-outline px-20 btn-primary'>See All Events</button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedEvents;