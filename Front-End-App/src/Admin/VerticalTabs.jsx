import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import PendingRequestCard from './PendingRequestCard';
import leonardoImage from '../assets/images/Leonardo-Dicaprio.png';
import faahadImage from '../assets/images/Faahad-Fazil.png';
import CaptainJackSparrowImage from '../assets/images/profile.png';
import WhoIsOnLeave from './WhoIsOnLeave';
import { formatDate, getEndDate } from '../common/getCurrentDate';
import TableSortAndSelection from '../common/TableSortAndSelection';
import './VerticalTabs.css';

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Employee Name',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
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
    }
];

const rows = [
    {
        id: '1',
        name: 'Captain Jack Sparrow',
        role: 'Team Lead',
        type: 'Sick',
        from: formatDate(getEndDate(Date.now(), -50)),
        to: formatDate(getEndDate(Date.now(), -48)),
        totalDays: 3
    },
    {
        id: '2',
        name: 'Heath Ledger',
        role: 'Senior Security Solutions Engineer',
        type: 'Casual',
        from: formatDate(getEndDate(Date.now(), -31)),
        to: formatDate(getEndDate(Date.now(), -30)),
        totalDays: 2
    },
    {
        id: '3',
        name: 'Vijay Sethupathi',
        role: 'Team Lead',
        type: 'Casual',
        from: formatDate(getEndDate(Date.now(), -3)),
        to: formatDate(getEndDate(Date.now(), -3)),
        totalDays: 1
    },
    {
        id: '4',
        name: 'Leonardo Dicaprio',
        role: 'Senior Security Solutions Engineer',
        type: 'Sick',
        from: formatDate(getEndDate(Date.now(), -10)),
        to: formatDate(getEndDate(Date.now(), -6)),
        totalDays: 5
    },
    {
        id: '5',
        name: 'Faahadh Fazil',
        role: 'Security Solutions Engineer',
        type: 'Casual',
        from: formatDate(getEndDate(Date.now(), 1)),
        to: formatDate(getEndDate(Date.now(), 5)),
        totalDays: 5
    }
];


export default function VerticalTabs() {
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
                    Pending (3)
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Approved (5)
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Rejected (4)
                </Tab>
            </TabList>
            <TabPanel value={0}>
                <div className="first-tab">
                    <div className="pending-requests">
                        <PendingRequestCard
                            leaveInfo={{
                                name: "Leonardo Dicaprio",
                                title: "Senior Security Solutions Engineer",
                                imageSrc: leonardoImage,
                                appliedDate: Date.now(),
                                startDate: Date.now(),
                                days: 3,
                                leaveType: 'Sick Leave',
                                reason: 'I cannot make it to the office tommorow as I have come down with case of flu, i am assuming the flu will take at least 3 days to go away.Thus i will be back to the office on wednesday.',
                                available: 10,
                            }}
                        />
                        <PendingRequestCard
                            leaveInfo={{
                                name: "Faahadh Fazil",
                                title: "Security Solutions Engineer",
                                imageSrc: faahadImage,
                                appliedDate: Date.now(),
                                startDate: Date.now(),
                                days: 1,
                                leaveType: 'Casual Leave',
                                reason: 'Nothing Important, but I just thought that I am going for a movie tomorrow',
                                available: 2,
                            }}
                        />
                        <PendingRequestCard
                            leaveInfo={{
                                name: "Captain Jack Sparrow",
                                title: "Team Lead",
                                imageSrc: CaptainJackSparrowImage,
                                appliedDate: Date.now(),
                                startDate: Date.now(),
                                days: 11,
                                leaveType: 'Casual Leave',
                                reason: 'I would like to plan a vacation with our pirate crew to Singapore.',
                                available: 12,
                            }}
                        />
                    </div>
                    <div className="employees-on-leave">
                        <WhoIsOnLeave />
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={1}>
                <TableSortAndSelection
                    headCells={headCells}
                    rows={rows}
                    variant="success"
                    toolBarParams={{
                        title: 'Approved Leave Applications',
                        styles: {
                            color: '#4bba7b',
                        }
                    }}
                />
            </TabPanel>
            <TabPanel value={2}>
                <TableSortAndSelection
                    headCells={headCells}
                    rows={rows.slice(0, 4)}
                    variant="rejection"
                    toolBarParams={{
                        title: 'Rejected Leave Applications',
                        styles: {
                            color: '#f05f56',
                        }
                    }}
                />
            </TabPanel>
        </Tabs >
    );
}