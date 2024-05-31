import React from 'react';
import { formatDate, parseDate } from '../common/getCurrentDate';
import { useSnackbar } from '../hooks/SnackBarProvider';
import Avatar from '@mui/joy/Avatar';
import DropDownIcon from '../assets/images/down-arrow.png';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';
import { fetchLeaves } from '../store/leaveSlice';
import './PendingRequestCard.css';
import axios from 'axios';
import config from '../config';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import colors from '@mui/joy/colors';


const PendingRequestCard = ({ id, name, role, email, profileImage, type, from, fromType, to, toType, noOfDays, reason, createdAt }) => {
    let parsedFrom = parseDate(from);
    let parsedTo = parseDate(to);
    const dispatch = useDispatch();
    const openSnackbar = useSnackbar();


    const approveRequest = async () => {
        openSnackbar('Request Sent!');
        try {
            await axios.put(`${config.SERVER_BASE_ADDRESS}/approveLeave/${id}`, {}, { withCredentials: true });
            openSnackbar(`Approved Leave for ${name}`, 'success');
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
    const rejectRequest = async () => {
        openSnackbar('Request Sent!');
        try {
            await axios.put(`${config.SERVER_BASE_ADDRESS}/rejectLeave/${id}`, {}, { withCredentials: true });
            openSnackbar(`Rejected Leave for ${name}`, 'success');
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


    return (
        <Card
            sx={{
                width: '350px',
                padding: 0,
                height: 'fit-content',
                paddingBottom: '20px'
            }}>
            <CardOverflow
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                    backgroundColor: '#f9f9f9',
                    padding: '15px 10px',
                    height: '87px',
                }}
            >
                <div className="profile">
                    <Avatar
                        alt={name}
                        src={profileImage}
                        className="image"
                        slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                    />
                    <div className="userInfo">
                        <Typography title={name} className="name">{name}</Typography>
                        <Typography title={role} className='title'>{role}</Typography>
                    </div>
                </div>
                <div className="date" title={new Date(createdAt).toLocaleString()}>
                    {formatDate(new Date(createdAt).toLocaleString())}
                </div>
            </CardOverflow>
            <CardContent
                sx={{
                    flex: 'inherit'
                }}>
                <div className="from-to">
                    <Tooltip title={fromType + (fromType === 'Full' ? ' Day' : '')} placement='top' arrow>
                        <div className="from">
                            <Typography className="month">{parsedFrom.month}</Typography>
                            <div className="day">
                                <Typography className="text">{parsedFrom.day}</Typography>
                                <img src={DropDownIcon} alt="" />
                            </div>
                            <div className="weekday">{parsedFrom.weekDay}</div>
                        </div>
                    </Tooltip>

                    <div className="middle">
                        <div className="arrow">
                            <Typography className="text">-----------➤</Typography>
                        </div>
                        <span className="count">{`${noOfDays} day${noOfDays > 1 ? 's' : ''}`}</span>
                    </div>
                    <Tooltip title={toType + (toType === 'Full' ? ' Day' : '')} arrow>
                        <div className="to">
                            <Typography className="month">{parsedTo.month}</Typography>
                            <div className="day">
                                <Typography className="text">{parsedTo.day}</Typography>
                                <img src={DropDownIcon} alt="" />
                            </div>
                            <div className="weekday">{parsedTo.weekDay}</div>
                        </div>
                    </Tooltip>
                </div>
                <div className="reason">
                    <div className="leave-type">{type} Leave</div>
                    <textarea className="description" defaultValue={reason} readOnly></textarea>
                </div>
            </CardContent>
            <CardActions>
                <ButtonGroup
                    spacing="5rem"
                    sx={{
                        padding: '5px 20px',
                    }}
                >
                    <Button
                        variant="solid"
                        onClick={approveRequest}
                        sx={{
                            width: '120px',
                            backgroundColor: colors.green[500],
                            '&:hover': {
                                backgroundColor: colors.green[400]
                            },
                            '&:active': {
                                backgroundColor: colors.green[300],
                                color: colors.green[700],
                            }
                        }}
                    >
                        Approve
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={rejectRequest}
                        sx={{
                            width: '120px',
                            color: colors.red[500],
                            borderColor: colors.red[200],
                            '&:hover': {
                                backgroundColor: colors.red[100]
                            },
                            '&:active': {
                                backgroundColor: colors.red[400],
                                color: '#f3f3f3'
                            }
                        }}
                    >
                        Reject
                    </Button>
                </ButtonGroup>
            </CardActions>

        </Card>
    );
}

export default PendingRequestCard;
