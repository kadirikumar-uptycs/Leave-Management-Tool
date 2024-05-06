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
}

function getStatusColorCode(status){
    if(status === 'Pending') return '#9a90c9'
    if(status === 'Approved') return '#2c6d58'
    return '#bd0c0c';
}
function getStatusButton(status) {
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

const LeaveHistory = () => {

    let leaveHistory = [
        {
            id: 1,
            category: 'Sick Leave',
            'from-to': '1st-2nd May',
            totalDays: 1,
            status: 'Pending',
        },
        {
            id: 2,
            category: 'Casual Leave',
            'from-to': '31st March-2nd April',
            totalDays: 3,
            status: 'Approved',
        },
        {
            id: 3,
            category: 'Casual Leave',
            'from-to': '17th-29th Feb',
            totalDays: 13,
            status: 'Rejected',
        },
        {
            id: 5,
            category: 'Paid Leave',
            'from-to': '15th-19th Jan',
            totalDays: 5,
            status: 'Approved',
        }
    ]

    return (
        <div className='application-history' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: '100%',
        }}>
            {leaveHistory.map(application => {
                return (
                    <div className='application' key={application.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        backgroundColor: '#fafafa',
                        padding: '5px',
                        width: '95%',
                        fontFamily: 'Poppins-Regular',
                    }}>
                        <span className='dot' style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '35%',
                            backgroundColor: getStatusColorCode(application.status),
                        }}>
                        </span>
                        <span
                            className='category'
                            style={{
                                width: '19%',
                                fontFamily: 'Poppins-SemiBold',
                                color: '#1b193d',
                            }}
                        >
                            {application.category}
                        </span>
                        <span
                            className="from-to"
                            style={{
                                width: '27%',
                                color: '#6c727f',
                                fontSize: '13px',
                                fontWeight: '500',
                            }}>
                            {application['from-to']}
                        </span>
                        <span
                            className="totalDays"
                            style={{
                                width: '9%',
                                textAlign: 'center',
                                color: '#6c727f',
                                fontSize: '13px',
                                fontWeight: '500',
                            }}
                        >
                            {`${application.totalDays}${(application.totalDays === 1) ? 'Day' : 'Days'}`}
                        </span>
                        <span
                            className='status'
                            style={{
                                width: '20%',
                                fontSize: '12px',
                                fontFamily: 'Poppins-Medium',
                                fontWeight: '400',
                            }}
                        >
                            {getStatusButton(application.status)}
                        </span>
                        <a
                            className="link"
                            href='/leaveHistory'
                            style={{
                                width: '5%',
                                color: '#969ba4',
                                fontSize: '10px',
                            }}
                        >
                            view
                        </a>
                    </div>
                )
            })}
        </div>
    );
}

export default LeaveHistory;
