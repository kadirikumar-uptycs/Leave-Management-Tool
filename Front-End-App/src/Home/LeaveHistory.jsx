import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StatusButton from '../common/StatusButton';
import { getDayAndMonth } from '../common/getCurrentDate';
import Typography from '@mui/joy/Typography';
import Loading from '../common/Loading';
import NoDataFound from '../common/NoDataFound';
import Error1 from '../common/Error1';

function getStatusColorCode(status) {
    if (status === 'Pending') return '#9a90c9'
    if (status === 'Approved') return '#2c6d58'
    return '#bd0c0c';
}

const LeaveHistory = () => {
    const leaveState = useSelector(state => state.leave);
    const leaves = leaveState.leaves;
    const loading = leaveState.loading;
    const errors = leaveState.error;
    const userId = useSelector(state => state.auth?.userInfo?._id);
    const myLeaves = leaves.filter(leave => leave.userId === userId);

    

    return (
        <div className='application-history' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            marginTop: '15px',
        }}>
            {loading && <div style={{ width: '100%', height: '400px' }}><Loading /></div>}
            {!loading && errors && <Error1 errors={errors} />}
            {!loading && !errors && Array.isArray(myLeaves) && !myLeaves.length && <NoDataFound />}
            {!loading && !errors && Array.isArray(myLeaves) && myLeaves.reverse().slice(0, 4).map(application => {
                return (
                    <div className='application' key={application._id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        backgroundColor: '#f4f9ff',
                        padding: '7px 5px',
                        marginBottom: '8px',
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
                            {application.type} Leave
                        </span>
                        <span
                            className="from-to"
                            style={{
                                width: '27%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <Typography
                                sx={{
                                    color: '#6c727f',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                }} title={application.fromType}
                            >
                                {getDayAndMonth(application.from)}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#6c727f',
                                    fontSize: '17px',
                                    fontWeight: '500',
                                }}
                            >
                                &nbsp;&nbsp;{"➺"}&nbsp;&nbsp;
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#6c727f',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                }}
                                title={application.toType}
                            >
                                {getDayAndMonth(application.to)}
                            </Typography>
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
                            {`${application.noOfDays} ${(application.noOfDays === 1) ? 'Day' : 'Days'}`}
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
                            <StatusButton status={application.status} />
                        </span>
                        <Link
                            className="link"
                            to='/leaveHistory'
                            style={{
                                width: '5%',
                                color: '#969ba4',
                                fontSize: '10px',
                            }}
                        >
                            view
                        </Link>
                    </div>
                )
            })}
        </div>
    );
}

export default LeaveHistory;