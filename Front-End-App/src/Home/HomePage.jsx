import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ProgressRing from './ProgressRing';
import LeaveHistory from './LeaveHistory';
import PerformanceHelpIcon from './PerformanceHelpIcon';
import LeaveRequestModal from './LeaveRequestModal';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SickIcon from '@mui/icons-material/Sick';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import './HomePage.css';

const HomePage = () => {
    let [showModal, setShowModal] = useState(false);
    let handleOpen = () => setShowModal(true);
    let handleClose = () => setShowModal(false);
    useLayoutEffect(() => {
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
                <LeaveRequestModal open={showModal} onClose={handleClose} />
            </div>
            <div className='row'>
                <div className="leave-balances col col-1">
                    <div className="heading">
                        <span>Leaves Taken</span>
                    </div>
                    <div className="stats">
                        <div className="stat">
                            <div className="icon">
                                <SickIcon className='mui-icon' />
                            </div>
                            <div className='info'>
                                <span className="count">05</span>
                                <span className="title">Sick Leaves</span>
                            </div>
                            <div className="link">
                                <Link to="/leaveHistory?type=Sick&status=Approved" style={{ color: 'inherit' }}>
                                    <OpenInNewIcon />
                                </Link>
                            </div>
                        </div>
                        <div className="stat">
                            <div className="icon">
                                <SelfImprovementIcon className='mui-icon' />
                            </div>
                            <div className='info'>
                                <span className="count">23.5</span>
                                <span className="title">Casual Leaves</span>
                            </div>
                            <div className="link">
                                <Link to="/leaveHistory?type=Casual&status=Approved" style={{ color: 'inherit' }}>
                                    <OpenInNewIcon />
                                </Link>
                            </div>
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
                        <Link to="/calendar" style={{ color: 'inherit' }}>See all</Link>
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
                        <Link to="/leaveHistory" style={{ color: 'inherit' }}>See all</Link>
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