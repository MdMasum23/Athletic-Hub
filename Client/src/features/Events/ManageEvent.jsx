import axios from 'axios';
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const ManageEvent = ({ event, index, onDeleteSuccess }) => {
    const { _id, image, eventName, eventDate, location, eventType } = event;

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This event will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            axios.delete(`https://a11-athletic-hub-server.vercel.app/events/${_id}`, {
                withCredentials: true
            })
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your event has been deleted.", "success");
                        onDeleteSuccess(_id); // Update parent state
                    }
                })
                .catch(err => {
                    console.error("Delete failed:", err);
                    Swal.fire("Error!", "Something went wrong.", "error");
                });
        }
    }

    return (
        <tr key={event._id}>
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
            <td className="flex gap-2 justify-center">
                <Link to={`/updateEvent/${_id}`}>
                    <button
                        // onClick={() => handleUpdate(event._id)}
                        className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                        <FaEdit /> Update
                    </button>
                </Link>

                <button
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                >
                    <FaTrashAlt /> Delete
                </button>
            </td>
        </tr>
    );
};

export default ManageEvent;