import React, { useLayoutEffect } from 'react';
import TableSortAndSelection from '../common/TableSortAndSelection';
import { formatDate, getEndDate } from '../common/getCurrentDate';
import StatusButton from '../common/StatusButton';
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


const rows = [
    {
        id: '1',
        type: 'Sick',
        from: formatDate(getEndDate(Date.now(), -50)),
        to: formatDate(getEndDate(Date.now(), -48)),
        totalDays: 3,
        status: {
            data: <StatusButton status="Approved"/>,
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
            data: <StatusButton status="Rejected"/>,
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
            data: <StatusButton status="Approved"/>,
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
            data: <StatusButton status="Rejected"/>,
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
            data: <StatusButton status="Pending"/>,
            content: "Pending",
        },
    }
];

const LeavesFullHistory = () => {
    useLayoutEffect(() => {
        document.title = 'Leave History';
    }, []);
    return (
        <div>
            <TableSortAndSelection
                headCells={headCells}
                rows={rows}
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
