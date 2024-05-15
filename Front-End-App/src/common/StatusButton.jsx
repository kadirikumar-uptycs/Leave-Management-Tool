import React from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';


let buttonStyle = {
    width: '100px',
    aspectRatio: '2.7/0.7',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: '6px',
    userSelect: 'none',
}

const StatusButton = ({ status }) => {
    if (status === 'Pending') {
        return (
            <div style={{
                color: '#9a90c9',
                backgroundColor: '#d8d5e8',
                ...buttonStyle,
            }}>
                {status}
                <AccessTimeRoundedIcon sx={{
                    color: '#7365b7',
                    fontSize: '17px',
                }} />
            </div>
        )
    }
    if (status === 'Approved') {
        return (
            <div style={{
                color: '#2c6d58',
                backgroundColor: '#c1d3cd',
                ...buttonStyle,
            }}>
                {status}
                <CheckCircleOutlineRoundedIcon sx={{
                    color: '#0c573f',
                    fontSize: '17px',
                }} />
            </div>
        )
    }
    // Rejected Case
    return (
        <div style={{
            color: '#bd0c0c',
            backgroundColor: '#eabbbb',
            ...buttonStyle,
        }}>
            {status}
            <HighlightOffRoundedIcon sx={{
                color: '#bb0303',
                fontSize: '17px',
            }} />
        </div>
    )
}

export default StatusButton;
