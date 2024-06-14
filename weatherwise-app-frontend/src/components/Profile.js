import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/auth/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <h2>Username: {user.username}</h2>
            <h3>Feedbacks:</h3>
            <ul>
                {user.Feedbacks.map(feedback => (
                    <li key={feedback.createdAt}>
                        <p>Comment: {feedback.comment}</p>
                        <p>Rating: {feedback.rating}</p>
                        <p>Date: {new Date(feedback.createdAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;
