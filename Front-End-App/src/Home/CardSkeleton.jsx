import React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

const CardSkeleton = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} className='stat'>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginRight: 2, marginTop: 2 }}>
                <Skeleton variant="circular" width={48} height={48} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', marginLeft: 5 }}>
                <Skeleton variant="rectangular" width={50} height={50} sx={{ mb: 2, marginLeft: 3 }} />
                <Skeleton variant="rectangular" width={180} height={20} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginRight: 2 }}>
                <Skeleton variant="rectangular" width={30} height={30} />
            </Box>
        </div>
    );
}

export default CardSkeleton;
