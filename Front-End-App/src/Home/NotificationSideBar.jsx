import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@mui/joy/Drawer';
import Stack from '@mui/joy/Stack';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Grid from '@mui/joy/Grid';
import IconButton from '@mui/joy/IconButton';
import { Tooltip, colors } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import { timeAgo } from '../common/getCurrentDate';
import config from '../config';
import { dismissNotification } from '../store/authSlice';
import axios from 'axios';
import NoData3 from '../common/NoData3';

const getColor = (type) => {
    switch (type) {
        case 'error':
            return { colorCode: colors.red[500], colorType: 'danger' }
        case 'success':
            return { colorCode: colors.green[400], colorType: 'success' }
        default:
            return { colorCode: colors.blue[400], colorType: 'primary' }
    }
}


const NotificationSideBar = ({ open, toggleDrawer }) => {
    const dispatch = useDispatch();
    const userNotifications = useSelector(state => state.auth?.userInfo?.notifications) || [];

    const handleDismissNotification = async (notificationId) => {
        try {
            dispatch(dismissNotification(notificationId));
            await axios.delete(`${config.SERVER_BASE_ADDRESS}/dismissNotification/${notificationId}`, { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    }

    const notificationCards = (!userNotifications.length) ? (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: 'hidden'
        }}>
            <div style={{
                width: '500px',
                height: '350px'
            }}>
                <NoData3 />
            </div>
            <Typography color='primary' component='h1' fontSize={29} fontFamily='Orbitron-Regular' fontWeight={900}>No Notifications</Typography>
        </div>
    ) : (
        userNotifications.map((notification) => {
            const { colorCode, colorType } = getColor(notification.type);
            return (
                <Box
                    key={notification.id}
                    sx={{
                        width: '423px',
                        marginBottom: '10px',
                    }}
                >
                    <Card
                        sx={{
                            borderTop: `2px solid ${colorCode}`
                        }}
                    >
                        <CardOverflow >
                            <Stack
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                marginTop={1}
                            >
                                <Typography component='h1' color={colorType}>{notification.heading}</Typography>
                                <Tooltip title='dismiss' color={colorType} variant='outlined' arrow>
                                    <IconButton
                                        color={colorType}
                                        sx={{ width: '24px' }}
                                        onClick={() => handleDismissNotification(notification.id)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </CardOverflow>
                        <CardContent>
                            <Grid container spacing={0} direction="row">
                                <Grid xs={12} style={{ marginTop: 10 }}>
                                    <Typography component='strong'>{notification.description}</Typography>
                                </Grid>
                                <Grid
                                    container
                                    xs={12}
                                    justifyContent="flex-end"
                                    style={{ marginTop: 10 }}
                                >
                                    <Typography
                                        variant="body2"
                                        title={new Date(notification.createdAt).toLocaleString()}
                                    >
                                        {timeAgo(new Date(notification.createdAt).toLocaleString())}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            )
        })
    )
    return (
        <Drawer
            anchor="right"
            size='md'
            open={open}
            onClose={toggleDrawer}
            sx={{
                '--Drawer-transitionDuration': open ? '0.4s' : '0.2s',
                '--Drawer-transitionFunction': open
                    ? 'cubic-bezier(0.79,0.14,0.15,0.86)'
                    : 'cubic-bezier(0.77,0,0.18,1)',
            }}
        >
            <Tooltip
                title='Close'
                color='neutral'
                variant='outlined'
                arrow
            >
                <ModalClose
                    color='danger'
                    size='lg'
                    sx={{
                        marginTop: '18px',
                        marginRight: '20px',
                    }}
                />
            </Tooltip>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                height={90}
                paddingLeft={3}
            >
                <Typography
                    fontFamily='Poppins-Regular'
                    component='h6'
                    fontSize={21}
                    fontWeight={500}
                    textAlign='center'
                    color='#000 !important'
                    startDecorator={
                        <NotificationsIcon color='error' sx={{ marginRight: '10px' }} />
                    }
                >
                    Notifications
                </Typography>
            </Stack>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#eee',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '15px',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollBehavior: 'smooth',
                    msScrollbarTrackColor: '#dbdcdc'
                }}
            >
                {notificationCards}
            </div>
        </Drawer>
    );
}

export default NotificationSideBar;
