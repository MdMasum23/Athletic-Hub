import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import "./navLinks.css";
import navLogo from '../../assets/navbar-icon.png';
import avatar from '../../assets/profile-avatar.png';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure you want to log-out?",
            text: "Log out of Athletic Hub?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log Out!"
        });

        if (result.isConfirmed) {
            logOut()
                .then(() => {
                    Swal.fire({
                        title: "Logged Out!",
                        text: "You have been logged out successfully.",
                        icon: "success"
                    });
                })
                .catch((error) => {
                    console.error("Logout error:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong while logging out!"
                    });
                });
        }
    };

    // Routes common for everyone
    const commonLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>
                Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "link active" : "link"}>
                About Us
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "link active" : "link"}>
                Contact
            </NavLink>
        </>
    );

    // Routes only for logged in users
    const loggedInLinks = (
        <>
            <NavLink to="/allEvents" className={({ isActive }) => isActive ? "link active" : "link"}>
                All Events
            </NavLink>
            <NavLink to="/create-event" className={({ isActive }) => isActive ? "link active" : "link"}>
                Create Event
            </NavLink>
        </>
    );

    return (
        <nav className="fixed top-0 left-0 w-full z-50"
            style={{
                background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
            }}
        >
            <div className="w-11/12 mx-auto p-3 flex items-center justify-between">

                {/* Navbar Start */}
                <div className="flex items-center gap-1.5">
                    {/* Mobile hamburger menu */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-10 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {commonLinks}
                            {user && loggedInLinks}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img className="w-10 h-10" src={navLogo} alt="Athletic Hub Logo" />
                        <div className="font-bold text-white text-lg select-none">
                            <span className="text-cyan-300">Athletic</span> <span className="text-white">Hub</span>
                        </div>
                    </Link>
                </div>

                {/* Navbar Center - desktop links */}
                <div className="hidden lg:flex space-x-6">
                    {commonLinks}
                    {user && loggedInLinks}
                </div>

                {/* Navbar End */}
                <div className="flex items-center gap-4">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-square btn-ghost tooltip tooltip-bottom"
                        data-tip={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? (
                            // Moon icon for dark mode
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                            </svg>
                        ) : (
                            // Sun icon for light mode
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.485-9h1M3.515 12h1m12.02-6.364l.707.707M6.343 17.657l.707.707m12.02 0l-.707.707M6.343 6.343l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                            </svg>
                        )}
                    </button>

                    {/* Profile dropdown for small screens (avatar only, with routes + logout inside) */}
                    {user && (
                        <div className="dropdown dropdown-end lg:hidden">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                                data-tip={user.displayName || "User"}
                            >
                                <div className="w-11 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL || avatar} alt="Profile" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-6 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <NavLink to="/book-event">Book Event</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-bookings">My Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manageEvents">Manage Events</NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left btn btn-outline hover:btn-error"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Profile dropdown for large screens (avatar + routes without logout) */}
                    {user && (
                        <div className="dropdown dropdown-end hidden lg:flex">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                                data-tip={user.displayName || "User"}
                            >
                                <div className="w-11 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL || avatar} alt="Profile" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-12 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <NavLink to="/book-event">Book Event</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-bookings">My Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manageEvents">Manage Events</NavLink>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Login button for both small and large screens when no user */}
                    {!user && (
                        <Link to="/auth/login" className="btn btn-primary">
                            Login
                        </Link>
                    )}

                    {/* Logout button for large screens (separate from avatar) */}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline hover:btn-error hidden lg:inline-block"
                        >
                            Logout
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;