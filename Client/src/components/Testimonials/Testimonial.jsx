import React from 'react';

const Testimonial = ({ feedback }) => {
    // console.log(feedback);
    const { name, image, comment } = feedback;

    return (
        <div className="bg-white dark:bg-base-200 p-6 rounded-2xl border-t-4 border-cyan-500 shadow-md hover:shadow-lg">
            <img
                src={image}
                alt={name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="mt-3 text-gray-600 italic">"{comment}"</p>
        </div>
    );
};

export default Testimonial;