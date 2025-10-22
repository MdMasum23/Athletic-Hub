import React from 'react';
import Lottie from 'lottie-react';
import notFoundPage from '../../assets/animation/not-found-page.json'
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] dark:from-[#1f2937] dark:to-[#111827] text-center px-4 py-10">
            <div className="w-[260px] sm:w-[380px] md:w-[500px] flex-shrink-0">
                <Lottie animationData={notFoundPage} loop={true} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mt-4">
                Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6 max-w-md">
                Sorry, the page you’re looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
                <FaArrowLeft className="text-white" />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;