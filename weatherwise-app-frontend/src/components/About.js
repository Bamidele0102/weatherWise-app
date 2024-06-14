import React from 'react';
import { Container, Typography, Grid, Link } from '@mui/material';

const teamMembers = [
    {
        name: 'Idowu Olayiwola Bamidele',
        linkedin: 'https://linkedin.com/in/olayiwola-bamidele-idowu',
        github: 'https://github.com/Bamidele0102',
        twitter: 'https://twitter.com/Edowood0102',
    },
    {
        name: 'Amajuoyi Victor',
        linkedin: 'https://linkedin.com/in/gavon',
        github: 'https://github.com/hegavon',
        twitter: 'https://twitter.com/hegavon',
    },
    {
        name: 'Ayomikun Phoenix Araoye',
        linkedin: 'https://linkedin.com/in/ayomikun-araoye-a2485b287',
        github: 'https://github.com/incredible-phoenix246',
        twitter: 'https://twitter.com/phoeniex246',
    },
];

const About = () => {
    return (
        <Container style={{ marginTop: '40px' }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
                About WeatherWise
            </Typography>
            <Typography variant="body1" component="p" paragraph>
                WeatherWise was inspired by a personal need for accurate and reliable weather forecasts. Our team noticed the challenges people faced with unpredictable weather changes and decided to create a solution. WeatherWise provides up-to-date weather information, ensuring users can plan their activities with confidence. This project is a part of the Holberton School Portfolio, aiming to showcase our skills and dedication.
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom>
                Meet The Team Members:
            </Typography>
            <Grid container spacing={4}>
                {teamMembers.map((member, index) => (
                    <Grid item xs={8} md={4} key={index}>
                        <Typography variant="h6">{member.name}</Typography>
                        <Link href={member.linkedin} target="_blank" rel="noopener">
                            LinkedIn
                        </Link>
                        {' | '}
                        <Link href={member.github} target="_blank" rel="noopener">
                            GitHub
                        </Link>
                        {' | '}
                        <Link href={member.twitter} target="_blank" rel="noopener">
                            Twitter
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h6" component="h3" style={{ marginTop: '20px' }}>
                <Link href="https://github.com/your-repo/weatherwise" target="_blank" rel="noopener">
                    View Project on GitHub
                </Link>
            </Typography>
        </Container>
    );
};

export default About;
