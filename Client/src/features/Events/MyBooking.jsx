import React from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const MyBooking = ({ booking, index, onDeleteSuccess }) => {

    const { _id, image, eventName, eventDate, location, eventType } = booking;

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this booking cancel!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        });

        if (result.isConfirmed) {
            axios.delete(`https://a11-athletic-hub-server.vercel.app/bookings/${id}`, {
                withCredentials: true
            })
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        toast.success("Booking Cancelled!");
                        onDeleteSuccess(id);
                    };
                })
                .catch(err => {
                    console.error('Delete Error:', err);
                    toast.error("Something went wrong while deleting!");
                });
        }

    };

    return (
        <tr key={booking._id}>
            <td>{index + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt={eventName} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{eventName}</div>
                    </div>
                </div>
            </td>
            <td>{eventDate}</td>
            <td>{location}</td>
            <td>{eventType}</td>
            <td>
                <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-error btn-xs text-white"
                >
                    <FaTrashAlt className="inline-block mr-1" />
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default MyBooking;