import React from 'react';
import { Link } from 'react-router';

const FeaturedEvent = ({ event }) => {
    const { _id, eventName, eventDate, location } = event;

    return (
        <div className="card dark:bg-base-200 mb-10 md:mb-0 border-b-2 border-l border-t border-cyan-600 shadow-md hover:scale-105 transition duration-300">
            {/* <Link to={`/event/${_id}`}> */}
                <div className="card-body">
                    <div className='flex flex-col md:flex-row items-start md:items-center space-y-4'>
                        <h3 className="card-title font-bold text-3xl">{eventName}</h3>
                        {/* <p className='font-medium flex justify-start md:justify-end'>{eventDate}</p> */}
                    </div>

                    <p className='font-medium mt-3'>{eventDate}</p>

                    <h3 className='font-medium text-lg'>{location}</h3>

                    <div className="card-actions justify-end">
                        <Link to={`/event/${_id}`}>
                            <button className="font-medium hover:text-cyan-700">View Details</button>
                        </Link>
                    </div>
                </div>
            {/* </Link> */}
        </div>
    );
};

export default FeaturedEvent;