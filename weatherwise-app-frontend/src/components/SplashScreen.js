import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import animationData from '../animations/splash.json';

const SplashScreen = ({ onComplete }) => {
    const [play, setPlay] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlay(false);
            if (typeof onComplete === 'function') {
                onComplete();
            } else {
                console.error('onComplete is not a function');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return play ? <Lottie options={defaultOptions} height={400} width={400} /> : null;
};

SplashScreen.propTypes = {
    onComplete: PropTypes.func.isRequired,
};

export default SplashScreen;
