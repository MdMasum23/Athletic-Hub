import React from 'react';
import Banner from '../../components/Banner/Banner';
import FeaturedEvents from '../../features/Events/FeaturedEvents';
import Testimonials from '../../components/Testimonials/Testimonials';
import PopularSports from '../../features/Events/PopularSports';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Athletic Hub | Home</title>
            </Helmet>

            <section className='Banner mt-18'>
                <Banner></Banner>
            </section>
            <section className='Events'>
                <FeaturedEvents></FeaturedEvents>
            </section>
            <section className='section-01'>
                <PopularSports></PopularSports>
            </section>
            <section className='section-02'>
                <Testimonials></Testimonials>
            </section>
        </div>
    );
};

export default Home;