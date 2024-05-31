import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import PendingRequestCard from './PendingRequestCard';
import WhoIsOnLeave from './WhoIsOnLeave';
import TableSortAndSelection from '../common/TableSortAndSelection';
import { fetchLeaves } from '../store/leaveSlice';
import { formatDate } from '../common/getCurrentDate';
import Loading from '../common/Loading';
import NoData from '../common/NoData';
import Error3 from '../common/Error3';
import NoDataFound from '../common/NoDataFound';
import headCells from './leavesTableRows.json';
import './VerticalTabs.css';



export default function VerticalTabs() {
    const dispatch = useDispatch();
    const leaveState = useSelector(state => state.leave);
    const leaves = leaveState.leaves;
    const loading = leaveState.loading;
    const errors = leaveState.error;
    const noData = leaveState.noData;


    let getDataBasedOnStatus = (status) => {
        if (Array.isArray(leaves)) {
            return leaves
                .filter(leave => leave.status === status)
                .map(leave => {
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
                    }
                })
        }
        return [];
    }

    useEffect(() => {
        if (Array.isArray(leaves) && !leaves.length && !noData && !errors) {
            dispatch(fetchLeaves());
        }
    }, [dispatch, leaves, loading, errors, noData]);

    const pendingLeaves = getDataBasedOnStatus('Pending');
    const approvedLeaves = getDataBasedOnStatus('Approved');
    const rejectedLeaves = getDataBasedOnStatus('Rejected');

    return (
        <Tabs
            variant="outlined"
            aria-label="Pricing plan"
            defaultValue={0}
            sx={{
                borderRadius: 'lg',
                boxShadow: 'sm',
                overflow: 'auto',
            }}
        >
            <TabList
                disableUnderline
                tabFlex={1}
                sx={{
                    [`& .${tabClasses.root}`]: {
                        fontSize: 'sm',
                        fontWeight: 'lg',
                        [`&[aria-selected="true"]`]: {
                            color: 'primary.500',
                            bgcolor: 'background.surface',
                        },
                        [`&.${tabClasses.focusVisible}`]: {
                            outlineOffset: '-4px',
                        },
                    },
                }}
            >
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Pending Leaves ({pendingLeaves.length})
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Approved Leaves ({approvedLeaves.length})
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Rejected Leaves ({rejectedLeaves.length})
                </Tab>
            </TabList>
            <TabPanel value={0}>
                <div className="first-tab">
                    <div className="pending-requests">
                        {!loading && !errors && pendingLeaves.map(leave => {
                            return (<PendingRequestCard
                                key={leave.id}
                                id={leave.id}
                                name={leave.name}
                                role={leave.role}
                                email={leave.email}
                                profileImage={leave.profileImage}
                                type={leave.type}
                                from={leave.from.content}
                                fromType={leave.fromType}
                                to={leave.to.content}
                                toType={leave.toType}
                                noOfDays={leave.noOfDays}
                                reason={leave.reason}
                                createdAt={leave.createdAt}
                            />)
                        })}
                    </div>
                    {loading && <div style={{ width: '100%', height: '600px' }}><Loading /></div>}
                    {!loading && errors && <div style={{ width: '100%', height: '600px' }}><Error3 errors={errors} /></div>}
                    {!loading && !errors && Array.isArray(pendingLeaves) && !pendingLeaves.length && <NoData />}
                    <div className="employees-on-leave">
                        <WhoIsOnLeave />
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={1}>
                <TableSortAndSelection
                    headCells={headCells}
                    rows={approvedLeaves}
                    variant="success"
                    toolBarParams={{
                        title: 'Approved Leave Applications',
                        styles: {
                            color: '#4bba7b',
                        }
                    }}
                />
                {!approvedLeaves.length && (
                    <div style={{ width: '100%', height: '600px' }}><NoDataFound /></div>
                )}
            </TabPanel>
            <TabPanel value={2}>
                <TableSortAndSelection
                    headCells={headCells}
                    rows={rejectedLeaves}
                    variant="rejection"
                    toolBarParams={{
                        title: 'Rejected Leave Applications',
                        styles: {
                            color: '#f05f56',
                        }
                    }}
                />
                {!rejectedLeaves.length && (
                    <div style={{ width: '100%', height: '600px' }}><NoDataFound /></div>
                )}
            </TabPanel>
        </Tabs >
    );
}