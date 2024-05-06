import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ProgressRing from './ProgressRing';
import LeaveHistory from './LeaveHistory';
import PerformanceHelpIcon from './PerformanceHelpIcon';
import LeaveRequestModal from './LeaveRequestModal';
import './HomePage.css';

const HomePage = () => {
    let [showModal, setShowModal] = useState(false);
    let handleOpen = () => setShowModal(true);
    let handleClose = () => setShowModal(false);
    useEffect(() => {
        document.title = 'Home';
    }, []);
    return (
        <>
            <div className='request-leave'>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#0c0048',
                        '&:hover': {
                            backgroundColor: '#0c0048',
                        },
                    }}
                    onClick={handleOpen}
                >
                    Request a Leave
                </Button>
                <LeaveRequestModal open={showModal} onClose={handleClose}/>
            </div>
            <div className='row'>
                <div className="leave-balances col col-1">
                    <div className="heading">
                        <span>Leave Balance</span>
                    </div>
                    <div className="stats">
                        <div className="stat stat-1">
                            <ProgressRing available={8} total={12} color="#9c82d4" showLabel={true} />
                            <span className='title'>Causual Leave</span>
                        </div>
                        <div className="stat stat-2">
                            <ProgressRing available={10} total={12} color="#ff9a91" showLabel={true} />
                            <span className='title'>Sick Leave</span>
                        </div>
                        <div className="stat stat-3">
                            <ProgressRing available={12} total={12} color="#93f0e6" showLabel={true} />
                            <span className='title'>Paid Leave</span>
                        </div>
                        <div className="stat stat-4">
                            <ProgressRing available={5} total={10} color="#b7f467" showLabel={true} />
                            <span className='title'>Earned Leave</span>
                        </div>
                    </div>
                </div>
                <div className="upcoming-holidays col col-2">
                    <div className="heading">
                        <span>Upcoming Public Holidays</span>
                    </div>
                    <div className="holidays">
                        <div className="holiday">
                            <span className='name'>Bakrid</span>
                            <span className='date'>17th Jun, Mon</span>
                        </div>
                        <div className="holiday">
                            <span className='name'>Independence Day</span>
                            <span className='date'>15th Aug, Thu</span>
                        </div>
                        <div className="holiday">
                            <span className='name'>Gandhi Jayanti</span>
                            <span className='date'>2nd Oct, Wed</span>
                        </div>
                    </div>
                    <div className='holidays-link'>
                        <a href="/calendar">See all</a>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="leave-history col col-1">
                    <div className="heading">
                        <span>Leave History</span>
                    </div>
                    <div className="leave-history">
                        <LeaveHistory />
                    </div>
                    <div className="applications-link">
                        <a href="/leaveHistory">See all</a>
                    </div>
                </div>
                <div className="Attendance-performance col col-2">
                    <div className="attendance">
                        <ProgressRing available={28} total={31} color="#0a3664" Radius={80} showPercentage={true} />
                        <PerformanceHelpIcon />
                    </div>
                    <div className="description">
                        <span className="status">Good Performance</span>
                        <span className="month">April Attendance Performance</span>
                        <span className="comment">Good Keep it up!</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
