import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Testimonial from './Testimonial';

const Testimonials = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('https://a11-athletic-hub-server.vercel.app/testimonials')
            .then(res => {
                setFeedbacks(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='my-32 px-4 text-center'>
            <h2 className="text-4xl font-bold mb-10">
                What Our <span className="text-cyan-600">Participants</span> Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {
                    feedbacks.map(feedback => <Testimonial
                        key={feedback._id}
                        feedback={feedback}
                    ></Testimonial>)
                }
            </div>
        </div>
    );
};

export default Testimonials;