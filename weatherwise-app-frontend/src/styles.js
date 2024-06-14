import { makeStyles } from '@mui/styles';
import backgroundImage from './assets/gradient_sky.jpg';

const useStyles = makeStyles({
    container: {
        marginTop: '50px',
        textAlign: 'center',
        zIndex: 1,
        position: 'relative',
    },
    card: {
        padding: '20px',
        marginBottom: '20px',
    },
    weatherIcon: {
        width: '50px',
        height: '50px',
    },
    forecastItem: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    appBar: {
        marginBottom: '20px',
    },
    coverImage: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#111',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundImage: `url(${backgroundImage})`, // Replace with your background image path
    },
    calendarContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
        overflow: 'hidden',
        height: 'fit-content',
        maxHeight: 'calc(100vh - 200px)', // Adjust as necessary
    },
    calendarTile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    title: {
        marginBottom: '20px',
    },
    textArea: {
        width: '100%',
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        resize: 'vertical',
    },
    ratingInput: {
        width: '60px',
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    submitButton: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
});

export default useStyles;
