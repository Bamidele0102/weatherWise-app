import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Typography, Grid } from '@mui/material';
import useStyles from '../styles';
import landingPage from '../assets/landingPage.jpg';

const LandingPage = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={12} style={{ backgroundImage: `url(${landingPage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundPosition: 'center', }}>
                    <Typography variant="h2" component="h1" align="center" style={{ color: '#111', marginBottom: '1rem' }}>
                        WeatherWise
                    </Typography>
                    <Typography variant="h5" align="center" style={{ color: '#111', marginBottom: '1rem' }}>
                        Your reliable source for accurate weather forecasts.
                    </Typography>
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" size="large" style={{ marginTop: '2rem' }}>
                            Explore Weather
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LandingPage;
