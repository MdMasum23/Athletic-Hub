import React from 'react';
import { Link } from 'react-router';

const SingleEvent = ({ event }) => {
    const { _id, image, eventName, eventDate, description } = event;

    const shortDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

    return (
        <div className="card bg-base-100 mb-10 md:mb-0 border-b-2 border-l border-purple-300 shadow-lg hover:scale-105 transition duration-300">
            <Link to={`/event/${_id}`}>
                <figure>
                    <img
                        src={image}
                        alt="Events"
                        className='w-full h-full sm:h-57 object-cover'
                    />
                </figure>
                <div className="card-body">
                    <div>
                        <h2 className="card-title">{eventName}</h2>
                        <p>{eventDate}</p>
                    </div>

                    <p className='overflow-hidden'>{shortDescription}</p>

                    <div className="card-actions justify-end">
                        {/* <Link to={`/event/${_id}`}> */}
                            <button className="font-medium hover:text-purple-700">View Details</button>
                        {/* </Link> */}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SingleEvent;