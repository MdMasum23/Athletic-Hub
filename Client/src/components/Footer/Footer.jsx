import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/fav-icon.png'
import { Link } from 'react-router';

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-base-300 text-base-content px-6 py-14">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-4">

                {/* Site Info */}
                <div>
                    <div>
                        <img className='w-10 h-10' src={logo} alt="" />
                        <h2 className="text-xl font-bold mb-2">Athletic Hub</h2>
                    </div>
                    <p className="text-sm">
                        AthleticHub connects athletes and organizers by simplifying event discovery, registration, and booking — all in one powerful, user-friendly, and efficient platform.
                    </p>


                </div>

                {/* Links */}
                <div>
                    <h3 className="footer-title mb-2">Legal</h3>
                    <ul className="space-y-1">
                        <li><Link to="/terms" onClick={scrollToTop} className="link link-hover">Terms & Conditions</Link></li>
                        <li><Link to="/privacy" onClick={scrollToTop} className="link link-hover">Privacy Policy</Link></li>
                        <li><Link to="/" onClick={scrollToTop} className="link link-hover">About Us</Link></li>
                        <li><Link href="/" className="link link-hover">Contact</Link></li>
                    </ul>
                </div>

                {/* Social Media links */}
                <div>
                    <h3 className="footer-title mb-2">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="https://www.facebook.com/Sheikhshubo333" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="text-center text-sm mt-16 border-t pt-14">
                © {new Date().getFullYear()} Athletic Hub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;