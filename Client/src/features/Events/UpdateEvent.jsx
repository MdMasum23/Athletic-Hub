import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const UpdateEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();
    // console.log(event);

    // get
    useEffect(() => {
        axios.get(`https://a11-athletic-hub-server.vercel.app/events/${id}`, {
            withCredentials: true
        })
            .then(res => {
                setEvent(res.data)
            })
            .catch(err => {
                console.error('Failed to load event:', err)
            })
    }, [id]);

    // Update
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;

        const updatedEvent = {
            eventName: form.eventName.value,
            eventDate: form.eventDate.value,
            location: form.location.value,
            eventType: form.eventType.value,
            description: form.description.value,
            image: form.image.value,
        };

        axios.put(`https://a11-athletic-hub-server.vercel.app/events/${id}`, updatedEvent, {
            withCredentials: true
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Event updated successfully", "success");
                    navigate('/manageEvents');
                }
            })
    }

    if (!event) {
        return <Loading></Loading>
    }

    return (
        <div className='max-w-3xl mx-auto my-10 p-8 border border-gray-200 shadow rounded-lg'>
            <Helmet>
                <title>Update Event | Athletic Hub</title>
            </Helmet>

            <h2 className='text-3xl font-bold mb-6 text-center text-purple-600'>✏️ Update Event</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>

                <input name="eventName"
                    defaultValue={event.eventName}
                    className='input input-bordered w-full'
                    placeholder="Event Name" required
                />

                <input type="date" name="eventDate"
                    defaultValue={event.eventDate}
                    className='input input-bordered w-full'
                    required
                />

                <input name="location"
                    defaultValue={event.location}
                    className='input input-bordered w-full'
                    placeholder="Location" required
                />

                <select name="eventType"
                    defaultValue={event.eventType}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="" disabled>Select event type</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Sprinting">Sprinting</option>
                    <option value="Marathon">Marathon</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Long Jump">Long Jump</option>
                    <option value="High Jump">High Jump</option>
                    <option value="Hurdle Race">Hurdle Race</option>
                </select>


                <input name="image"
                    defaultValue={event.image}
                    className='input input-bordered w-full'
                    placeholder="Image URL" required
                />

                <textarea name="description"
                    defaultValue={event.description}
                    className='textarea textarea-bordered w-full'
                    rows={4} placeholder="Description" required>
                </textarea>

                {/* user_email hidden (readonly) */}
                <input type="email"
                    value={event.creatorEmail} disabled
                    className='input input-bordered w-full bg-gray-100 cursor-not-allowed'
                />

                <button type="submit" className='btn btn-primary w-full'>Update Event</button>
            </form>
        </div>
    );
};

export default UpdateEvent;