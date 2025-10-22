import React from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>Privacy Policy | Athletic Hub</title>
            </Helmet>
            
            <h1 className="text-4xl font-bold mb-10 text-center">Privacy Policy</h1>
            
            <p className="mb-4">
                AthleticHub values your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.
            </p>

            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="mb-4">
                We collect personal information such as your name, email address, and any other data you provide during registration or while booking events.
            </p>

            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p className="mb-4">
                We use your information to provide services, manage your bookings, personalize your experience, and communicate important updates or promotions.
            </p>

            <h2 className="text-xl font-semibold mb-2">3. Data Sharing and Protection</h2>
            <p className="mb-4">
                We do not sell your personal information. Your data may be shared with event organizers only when necessary for managing your bookings. We implement appropriate security measures to protect your data.
            </p>

            <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
            <p className="mb-4">
                We may use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
            <p className="mb-4">
                You have the right to access, update, or delete your personal information. To make a request, please contact our support team.
            </p>

            <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy as needed. Continued use of the platform after updates implies your acceptance of the revised policy.
            </p>

            <p className="mt-8 text-sm text-gray-500">
                Last updated: June 10, 2025
            </p>
        </div>
    );
};

export default Privacy;