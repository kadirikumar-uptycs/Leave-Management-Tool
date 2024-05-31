import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { fetchLeaves } from '../store/leaveSlice';
import { useSnackbar } from '../hooks/SnackBarProvider';
import Button from '@mui/material/Button';
import ProgressRing from './ProgressRing';
import LeaveHistory from './LeaveHistory';
import PerformanceHelpIcon from './PerformanceHelpIcon';
import LeaveRequestModal from './LeaveRequestModal';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SickIcon from '@mui/icons-material/Sick';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/joy/IconButton';
import CardSkeleton from './CardSkeleton';
import Error1 from '../common/Error1';
import NoDataFound from '../common/NoDataFound';
import axios from 'axios';
import config from '../config';
import { formatDateToStandard, formatDate, getLastMonthName } from '../common/getCurrentDate';
import events from '../Calendar/events.json';
import './HomePage.css';
import { countLeaves, countWorkingDays } from './performanceCalculator';
import Typography from '@mui/joy/Typography';
import Loading from '../common/Loading';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const leaveState = useSelector(state => state.leave);
    const leaves = leaveState.leaves;
    const loading = leaveState.loading;
    const errors = leaveState.error;
    const noData = leaveState.noData;
    const userId = useSelector(state => state.auth?.userInfo?._id);
    const userShift = useSelector(state => state.auth?.userInfo?.shift);
    const myLeaves = leaveState.leaves.filter(leave => leave.userId === userId);

    const userHolidays = (!Array.isArray(events)) ?
        [] : (events.filter(
            event => event?.tags?.includes(userShift)
                && (event.date > formatDateToStandard(new Date()))
        ).slice(0, 3));

    const totalWorkingDays = useMemo(() => countWorkingDays(userShift), [userShift]);
    const userLeavesCount = useMemo(() => countLeaves(userShift, myLeaves), [userShift, myLeaves]);
    const userWorkedDays = totalWorkingDays - userLeavesCount;
    let performance = userWorkedDays / totalWorkingDays * 100;
    let getReviewComments = (performance) => {
        let status = "Good";
        let comments = "GOOD KEEP IT UP!";
        if (performance >= 90) {
            status = "Good";
            comments = "GOOD KEEP IT UP!";
        } else if (performance < 90 && performance > 80) {
            status = "Average";
            comments = "NEEDS IMPROVEMENT!";
        } else {
            status = "Bad";
            comments = "SIGNIFICANT IMPROVEMENT NEEDED!";
        }
        return { status, comments }
    }

    let { status, comments } = getReviewComments(performance);
    let lastMonthName = getLastMonthName();


    const getLeavesCount = (type) => {
        if (!Array.isArray(myLeaves)) {
            return '🛑'
        }
        let count = myLeaves.filter(leave => leave.status === 'Approved' && leave.type === type).reduce((total, event) => total += event.noOfDays, 0);
        return ((count < 10 && count === parseInt(count, 10)) ? '0' : '') + count;
    }

    const openSnackbar = useSnackbar();
    let [showModal, setShowModal] = useState(false);
    let handleOpen = () => setShowModal(true);
    let handleClose = () => setShowModal(false);
    let onLeaveFormSubmit = async (formData) => {
        handleClose();
        try {
            await axios.post(`${config.SERVER_BASE_ADDRESS}/applyLeave`, formData, { withCredentials: true });
            openSnackbar('Leave application sent!', 'success');
            dispatch(fetchLeaves());
        } catch (err) {
            console.log(err);
            openSnackbar(err?.response?.data?.message || err.message, 'danger');
            if (err?.response?.status === 401) {
                dispatch(logout());
                navigate('/login');
            }
        }
    }
    useLayoutEffect(() => {
        document.title = 'Home';
    }, []);

    useEffect(() => {
        if (Array.isArray(leaves) && !leaves.length && !noData && !errors) {
            dispatch(fetchLeaves());
        }
    }, [dispatch, leaves, errors, noData]);

    const sickLeavesCount = getLeavesCount('Sick');
    const casualLeavesCount = getLeavesCount('Casual');

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
                <LeaveRequestModal open={showModal} onClose={handleClose} onLeaveFormSubmit={onLeaveFormSubmit} />
            </div>
            <div className='row'>
                <div className="leave-balances col col-1">
                    <Typography className="heading" title="Leaves Count In days">Leaves Taken</Typography>
                    <div className="stats">
                        {loading && <CardSkeleton />}
                        {errors && <Error1 errors={errors} />}
                        {!loading && !errors && (
                            <div className="stat" title={sickLeavesCount + ' days'}>
                                <div className="icon">
                                    <SickIcon className='mui-icon' />
                                </div>
                                <div className='info'>
                                    <Typography className="count">{sickLeavesCount}</Typography>
                                    <Typography className="title">Sick Leaves</Typography>
                                </div>
                                <div className="link">
                                    <Link to="/leaveHistory?type=Sick&status=Approved" style={{ color: 'inherit' }}>
                                        <IconButton color='primary'>
                                            <OpenInNewIcon />
                                        </IconButton>
                                    </Link>
                                </div>
                            </div>)}
                        {loading && <CardSkeleton />}
                        {!loading && !errors && (
                            <div className="stat" title={casualLeavesCount + ' days'}>
                                <div className="icon">
                                    <SelfImprovementIcon className='mui-icon' />
                                </div>
                                <div className='info'>
                                    <span className="count">{casualLeavesCount}</span>
                                    <span className="title">Casual Leaves</span>
                                </div>
                                <div className="link">
                                    <Link to="/leaveHistory?type=Casual&status=Approved" style={{ color: 'inherit' }}>
                                        <IconButton color='primary'>
                                            <OpenInNewIcon />
                                        </IconButton>
                                    </Link>
                                </div>
                            </div>)}
                    </div>
                </div>
                <div className="upcoming-holidays col col-2">
                    <div className="heading">
                        <span>Upcoming Public Holidays</span>
                    </div>
                    <div className="holidays">
                        {Array.isArray(userHolidays) && events.length && userHolidays.map((event) => {
                            return (
                                <div className="holiday" key={event.title}>
                                    <span className='name'>{event.title}</span>
                                    <span className='date'>{formatDate(event.date)}</span>
                                </div>
                            )
                        })}
                        {(!Array.isArray(userHolidays) || !userHolidays.length) && <NoDataFound />}
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
                    {loading && <div style={{ width: '100%', height: '400px' }}><Loading /></div>}
                    {!loading && errors && <Error1 errors={errors} />}
                    {!loading && !errors && Array.isArray(myLeaves) && (
                        <>
                            <div className="attendance">
                                <ProgressRing available={userWorkedDays} total={totalWorkingDays} color="#0a3664" Radius={80} showPercentage={true} />
                                <PerformanceHelpIcon />
                            </div>
                            <div className="description">
                                <span className="status">{status} Performance</span>
                                <span className="month">{lastMonthName} Attendance Performance</span>
                                <span className="comment">{comments}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default HomePage;