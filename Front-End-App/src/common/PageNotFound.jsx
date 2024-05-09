import React from 'react';
import Lottie from 'lottie-react';
import LottieFile from '../assets/images/Lottie/page_not_found.json';
const PageNotFound = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center'
        }}>
            <Lottie
                animationData={LottieFile}
                loop={true}
                autoplay={true}
                style={{
                    width: '900px',
                    height: '500px'
                }}
            />
        </div>
    );
}

export default PageNotFound;
