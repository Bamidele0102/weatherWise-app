import React, { useState } from 'react';
import axios from 'axios';
import useStyles from '../styles';  // Ensure the correct import path

function Feedback() {
    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/feedback`, 
                { comment, rating }, 
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            alert('Feedback submitted');
        } catch (error) {
            console.error('Error submitting feedback', error);
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Feedback</h1>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Your feedback"
                    className={classes.textArea}
                />
                <input 
                    type="number" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    min="1" 
                    max="5"
                    className={classes.ratingInput}
                />
                <button type="submit" className={classes.submitButton}>Submit</button>
            </form>
        </div>
    );
}

export default Feedback;
