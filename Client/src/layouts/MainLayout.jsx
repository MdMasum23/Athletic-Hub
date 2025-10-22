import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <header className='border-b-2 border-base-300'>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto mt-16'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;