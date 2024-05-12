import React, { useLayoutEffect } from 'react';

const Analytics = () => {
    useLayoutEffect(() => {
        document.title = "Analytics";
    }, [])
    return (
        <div>
            Analytics (To be Implemented)
        </div>
    );
}

export default Analytics;
