import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const BookingCard = ({ booking, onDeleteSuccess }) => {
    const { _id, image, eventName, eventDate, location, eventType } = booking;

    const handleDelete = async () => {
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
            axios.delete(`https://a11-athletic-hub-server.vercel.app/bookings/${_id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        toast.success("Booking Cancelled!");
                        onDeleteSuccess(_id);
                    }
                })
                .catch(err => {
                    console.error('Delete Error:', err);
                    toast.error("Something went wrong while deleting!");
                });
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl border">
            <figure><img src={image} alt={eventName} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
                <h2 className="card-title">{eventName}</h2>
                <p><strong>Date:</strong> {eventDate}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Type:</strong> {eventType}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={handleDelete}
                        className="btn btn-sm btn-error text-white"
                    >
                        <FaTrashAlt className='mr-1' /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;