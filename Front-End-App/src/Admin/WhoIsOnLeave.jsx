import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Avatar from '@mui/joy/Avatar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Typography from '@mui/joy/Typography';
import getLabelledLeavesData from './labelLeaves';
import './WhoIsOnLeave.css';
import LoadingProfileSkeleton from './LoadingProfileSkeleton';


const WhoIsOnLeave = () => {
    const leaveState = useSelector(state => state.leave);
    const leaves = leaveState.leaves;
    const loading = leaveState.loading;

    const data = useMemo(() => getLabelledLeavesData(leaves), [leaves]);
    return (
        <Card
            sx={{
                width: '400px',
                height: '550px',
            }}>
            <CardOverflow
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    padding: '20px 2px 10px 2px',
                    color: '#4a4d53',
                    fontFamily: "Poppins-SemiBold",
                    fontSize: '19px',
                    fontWeight: '900',
                }}
            >
                <Typography startDecorator={<EventBusyIcon />}>Who's on Leave</Typography>
            </CardOverflow>
            <Divider />
            <CardContent className="list">
                {data.map((list, index) => (
                    <div className="group" key={list.label}>
                        <Typography className="label">{list.label}</Typography>
                        {loading ? (
                            <React.Fragment>
                                {Array.from({ length: index + 1 }, (_, i) => (
                                    <LoadingProfileSkeleton key={`skeleton-${i}`} />
                                ))}
                            </React.Fragment>
                        ) : (
                            <div className="profiles">
                                {list.profiles.map((item, index) => (
                                    <div className="profile" key={list.label + item.name + index}>
                                        <Avatar
                                            sx={{ userSelect: 'none', marginRight: '10px' }}
                                            alt={item.name}
                                            src={item.profileImage}
                                            slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                                        />
                                        <div className="userInfo">
                                            <Typography title={item.name} className="name">{item.name}</Typography>
                                            <Typography title={item.role} className="role">{item.role}</Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default WhoIsOnLeave;