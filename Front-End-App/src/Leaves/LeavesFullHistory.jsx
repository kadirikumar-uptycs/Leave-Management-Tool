import React, {useLayoutEffect} from 'react';

const LeavesFullHistory = () => {
    useLayoutEffect(() => {
        document.title = 'Leave History';
    }, []);
    return (
        <div>
            Leave History (To be Implemented)
            <span>This page has to be implemented after starting server</span>
        </div>
    );
}

export default LeavesFullHistory;
