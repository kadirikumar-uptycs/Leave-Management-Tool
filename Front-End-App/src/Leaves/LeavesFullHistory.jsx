import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TableSortAndSelection from '../common/TableSortAndSelection';
import { formatDate } from '../common/getCurrentDate';
import Tooltip from '@mui/joy/Tooltip';
import StatusButton from '../common/StatusButton';
import RadioGroup from '../common/RadioGroup';
import IconButton from '@mui/joy/IconButton';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { fetchLeaves } from '../store/leaveSlice';
import Loading from '../common/Loading';
import NoDataFound from '../common/NoDataFound';
import tableHeadCells from './leavesTableColumns.json';
import LeaveReason from './LeaveReason';
import Error2 from '../common/Error2';
import PageNotFound from '../common/PageNotFound';

const LeavesFullHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const leaveState = useSelector(state => state.leave);
    const leaves = leaveState.leaves;
    const loading = leaveState.loading;
    const errors = leaveState.error;
    const noData = leaveState.noData;
    const userInfo = useSelector(state => state.auth.userInfo);
    const userId = userInfo?._id;
    const currentUserRoles = userInfo?.roles || ['User'];
    const canAccessPage = currentUserRoles.includes('Admin') || !currentUserRoles.includes('Manager');
    const myLeaves = leaveState.leaves.filter(leave => leave.userId === userId);
    let [searchParams] = useSearchParams();
    let leaveType = searchParams.get("type");
    let statusType = searchParams.get("status");
    let leaveId = searchParams.get("id");

    useLayoutEffect(() => {
        document.title = 'Leave History';
    }, []);

    function handletypeChange(event, index, option) {
        navigate(`/leaveHistory?type=${option}${(statusType) ? `&status=${statusType}` : ''}`);
    }
    function handleStatusChange(event, index, option) {
        navigate(`/leaveHistory?${(leaveType) ? `type=${leaveType}&` : ''}status=${option}`);
    }
    function getfilteredData() {
        if (leaveId) {
            return myLeaves.filter(item => item._id === leaveId);
        }
        let temp_rows = myLeaves.map((item) => item);
        if ((leaveType && leaveType !== 'All')) {
            temp_rows = myLeaves.filter(item => item.type === leaveType);
        }
        if (statusType && ['Approved', 'Rejected', 'Pending'].includes(statusType)) {
            return temp_rows && temp_rows.filter(item => item.status === statusType);
        }
        return temp_rows;
    }
    useEffect(() => {
        if (Array.isArray(leaves) && !leaves.length && !noData && !errors) {
            dispatch(fetchLeaves());
        }

    }, [dispatch, leaves, errors, noData]);

    const filteredData = getfilteredData();
    return (
        !canAccessPage ? (
            <PageNotFound />
        ) : (
            <>
                {
                    (Array.isArray(myLeaves)) ? (
                        <div>
                            <div style={{
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <RadioGroup
                                    type="leave-type"
                                    first="All"
                                    second="Sick"
                                    last="Casual"
                                    handleChangeEvent={handletypeChange}
                                    defaultValue={leaveType ? leaveType : null}
                                />
                                <div onClick={
                                    () => navigate('/leaveHistory')
                                }>
                                    <Tooltip arrow title="Clear Filters" color='primary' placement='top' variant='outlined'>
                                        <IconButton>
                                            <FilterAltOffIcon sx={{
                                                color: '#222bcc',
                                                padding: '3px',
                                                fontSize: '31px'
                                            }} />
                                        </IconButton >
                                    </Tooltip>
                                </div>
                                <RadioGroup
                                    type="status-type"
                                    first="Approved"
                                    second="Pending"
                                    last="Rejected"
                                    handleChangeEvent={handleStatusChange}
                                    defaultValue={(statusType && ['Approved', 'Rejected', 'Pending'].includes(statusType)) ? statusType : null}
                                />

                            </div>
                            <TableSortAndSelection
                                headCells={tableHeadCells}
                                rows={filteredData.map(leave => {
                                    return {
                                        ...leave,
                                        id: leave._id,
                                        from: {
                                            data: formatDate(leave.from),
                                            content: leave.from
                                        },
                                        to: {
                                            data: formatDate(leave.to),
                                            content: leave.to
                                        },
                                        status: {
                                            data: <StatusButton status={leave.status} />,
                                            content: leave.status,
                                        },
                                        reason: {
                                            data: (
                                                <LeaveReason reason={leave.reason} />
                                            ),
                                            content: leave.reason,
                                        }
                                    };
                                })}
                                toolBarParams={{
                                    title: 'Applied Leaves',
                                    styles: {
                                        color: '#0c0048',
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontFamily: 'Poppins-SemiBold',
                                    }
                                }}
                            />
                        </div>
                    ) : <></>
                }
                {loading && <div style={{ width: '100%', height: '600px' }}><Loading /></div>}
                {errors && <div style={{ width: '100%', height: '600px' }}><Error2 errors={errors} /></div>}
                {!loading && !errors && Array.isArray(filteredData) && !filteredData.length && <div style={{ width: '100%', height: '600px' }}><NoDataFound /></div>}
            </>
        )

    );
}

export default LeavesFullHistory;
