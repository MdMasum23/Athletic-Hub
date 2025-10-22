import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state || '/';

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });

        // firebase Login Send.
        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "LogIn Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    navigate(from);
                }, 1500);
            })
            .catch(error => {
                console.error(error);
                toast.error('Invalid Email or Password');
            });
    }

    return (
        <div className="min-h-fit py-24 pb-44 lg:py-24 flex items-center justify-center bg-base-200">
            <Helmet>
                <title>Login | Athletic Hub</title>
            </Helmet>

            <div className="w-full max-w-md p-8 mx-4 space-y-4 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-primary">Login Now!</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* email felid */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* password field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* submit button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </form>

                <div className="divider">OR</div>

                {/* google login */}
                <div>
                    <SocialLogin></SocialLogin>
                </div>

                {/* register page */}
                <p className="text-center text-sm">
                    Don’t have an account? <Link to="/auth/register" className="text-primary hover:underline">Register</Link>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;