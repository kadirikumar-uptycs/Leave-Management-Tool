import React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
const LoadingProfileSkeleton = () => {
    return (
        <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2, margin: '20px 0'}}>
            <Skeleton variant="circular" width={40} height={40} />
            <div>
                <Skeleton variant="rectangular" width={200} height="1em" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" width={140} height="1em" />
            </div>
        </Box>
    );
}

export default LoadingProfileSkeleton;
