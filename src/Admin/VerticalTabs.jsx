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
import { getCurrentDate, getEndDate } from '../common/getCurrentDate';
import TableSortAndSelection from './LeavesTable';
import './VerticalTabs.css';

const rows = [
    {
      name: 'Captain Jack Sparrow',
      role: 'Team Lead',
      type: 'Sick',
      from: getCurrentDate(getEndDate(Date.now(), 50)),
      to: getCurrentDate(getEndDate(Date.now(), 47)),
      totalDays: 3
    },
    {
      name: 'Captain Jack Sparrow',
      role: 'Team Lead',
      type: 'Sick',
      from: getCurrentDate(getEndDate(Date.now(), 50)),
      to: getCurrentDate(getEndDate(Date.now(), 47)),
      totalDays: 3
    },
    {
      name: 'Captain Jack Sparrow',
      role: 'Team Lead',
      type: 'Sick',
      from: getCurrentDate(getEndDate(Date.now(), 50)),
      to: getCurrentDate(getEndDate(Date.now(), 47)),
      totalDays: 3
    },
    {
      name: 'Captain Jack Sparrow',
      role: 'Team Lead',
      type: 'Sick',
      from: getCurrentDate(getEndDate(Date.now(), 50)),
      to: getCurrentDate(getEndDate(Date.now(), 47)),
      totalDays: 3
    },
    {
      name: 'Captain Jack Sparrow',
      role: 'Team Lead',
      type: 'Sick',
      from: getCurrentDate(getEndDate(Date.now(), 50)),
      to: getCurrentDate(getEndDate(Date.now(), 47)),
      totalDays: 3
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
                    Pending (2)
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Approved (5)
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Rejected (3)
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
                <TableSortAndSelection rows={rows} variant="success" />
            </TabPanel>
            <TabPanel value={2}>
            <TableSortAndSelection rows={rows.slice(0, 3)} variant="rejection" />
            </TabPanel>
        </Tabs >
    );
}