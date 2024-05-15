import React, { useLayoutEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TableSortAndSelection from '../common/TableSortAndSelection';
import { formatDate, getEndDate } from '../common/getCurrentDate';
import Tooltip from '@mui/joy/Tooltip';
import StatusButton from '../common/StatusButton';
import RadioGroup from '../common/RadioGroup';
import IconButton from '@mui/joy/IconButton';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
const headCells = [
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Leave Type',
    },
    {
        id: 'from',
        numeric: false,
        disablePadding: false,
        label: 'From',
    },
    {
        id: 'to',
        numeric: false,
        disablePadding: false,
        label: 'To',
    },
    {
        id: 'totalDays',
        numeric: true,
        disablePadding: false,
        label: 'Total Days',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
        type: "object",
    }
];


let rows = [
    {
        id: '1',
        type: 'Sick',
        from: formatDate(getEndDate(Date.now(), -50)),
        to: formatDate(getEndDate(Date.now(), -48)),
        totalDays: 3,
        status: {
            data: <StatusButton status="Approved" />,
            content: "Approved",
        },
    },
    {
        id: '2',
        type: 'Casual',
        from: formatDate(getEndDate(Date.now(), -31)),
        to: formatDate(getEndDate(Date.now(), -30)),
        totalDays: 2,
        status: {
            data: <StatusButton status="Rejected" />,
            content: "Rejected",
        },
    },
    {
        id: '3',
        type: 'Casual',
        from: formatDate(getEndDate(Date.now(), -3)),
        to: formatDate(getEndDate(Date.now(), -3)),
        totalDays: 1,
        status: {
            data: <StatusButton status="Approved" />,
            content: "Approved",
        },
    },
    {
        id: '4',
        type: 'Sick',
        from: formatDate(getEndDate(Date.now(), -10)),
        to: formatDate(getEndDate(Date.now(), -6)),
        totalDays: 5,
        status: {
            data: <StatusButton status="Rejected" />,
            content: "Rejected",
        },
    },
    {
        id: '5',
        type: 'Casual',
        from: formatDate(getEndDate(Date.now(), 1)),
        to: formatDate(getEndDate(Date.now(), 5)),
        totalDays: 5,
        status: {
            data: <StatusButton status="Pending" />,
            content: "Pending",
        },
    }
];

const LeavesFullHistory = () => {
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();
    let leaveType = searchParams.get("type");
    let statusType = searchParams.get("status");

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
        let temp_rows = rows.map((item) => item);
        if ((leaveType && leaveType !== 'All')) {
            temp_rows = rows.filter(item => item.type === leaveType);
        }
        if (statusType && ['Approved', 'Rejected', 'Pending'].includes(statusType)) {
            return temp_rows && temp_rows.filter(item => item.status.content === statusType);
        }
        return temp_rows;
    }
    return (
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
                    defaultValue={leaveType ? leaveType: null}
                />
                <div onClick={
                    () => navigate('/leaveHistory')
                }>
                <Tooltip arrow title="Clear Filters" color='primary' placement='top'>
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
                headCells={headCells}
                rows={getfilteredData()}
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
    );
}

export default LeavesFullHistory;
