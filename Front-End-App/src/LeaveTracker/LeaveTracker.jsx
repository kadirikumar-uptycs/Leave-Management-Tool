import React, { useLayoutEffect } from 'react';

const LeaveTracker = () => {
    useLayoutEffect(() => {
        document.title = "Leave Tracker"
    }, [])
    return (
        <div>
            Leave Tracker
        </div>
    );
}

export default LeaveTracker;
