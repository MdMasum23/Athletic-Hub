import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>Terms & Conditions | Athletic Hub</title>
            </Helmet>

            <h1 className="text-4xl font-bold mb-10 text-center">Terms & Conditions</h1>

            <p className="mb-4">
                Welcome to AthleticHub, an athletic event booking platform. By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold mb-2">1. User Responsibilities</h2>
            <p className="mb-4">
                Users must provide accurate information during registration. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-semibold mb-2">2. Event Participation</h2>
            <p className="mb-4">
                By booking an event, you agree to follow the rules and guidelines set by the event organizers. AthleticHub is not responsible for the quality, safety, or conduct of any event listed on our platform.
            </p>

            <h2 className="text-xl font-semibold mb-2">3. Cancellations and Refunds</h2>
            <p className="mb-4">
                Event cancellations and refunds are subject to the policies of the individual organizers. AthleticHub does not handle refunds directly unless otherwise stated.
            </p>

            <h2 className="text-xl font-semibold mb-2">4. Platform Usage</h2>
            <p className="mb-4">
                You agree not to misuse the platform, upload harmful content, or engage in fraudulent activity. AthleticHub reserves the right to terminate accounts that violate these terms.
            </p>

            <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
            <p className="mb-4">
                We may update these Terms and Conditions from time to time. Continued use of the platform after changes constitutes your acceptance of the new terms.
            </p>

            <p className="mt-8 text-sm text-gray-500">
                Last updated: June 10, 2025
            </p>
        </div>
    );
};

export default Terms;