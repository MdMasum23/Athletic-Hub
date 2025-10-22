import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result);
                navigate(from);
            })
            .catch(error => {
                console.error(error);
                // toast.error('Invalid User');
            });
    }

    return (
        <div>
            {/* Google */}
            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full flex items-center justify-center gap-2">
                <FcGoogle size={20} />
                Login with Google
            </button>
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        </div>
    );
};

export default SocialLogin;