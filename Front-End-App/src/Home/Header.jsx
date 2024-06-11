import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import Avatar from '@mui/joy/Avatar';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';
import NotificationSideBar from './NotificationSideBar';

const Header = () => {
    let [openDrawer, setOpenDrawer] = useState(false);
    const userInfo = useSelector(state => state.auth.userInfo);
    const userName = userInfo.name;
    const userProfileImage = userInfo.profileImage;
    const userNotifications = userInfo?.notifications || [];
    const notificationsCount = userNotifications.length;
    const haveNotifications = notificationsCount > 0;
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(prev => !prev);
    };
    return (
        <>
            <Card
                sx={{
                    width: '100%',
                    height: '70px',
                    borderRadius: 0,
                    borderLeft: '0',
                    position: 'sticky',
                    top: 0,
                    zIndex: 3,
                    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.1)'
                }}
            >

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingLeft={3}
                    paddingRight={5}
                >
                    <Typography
                        component='h1'
                        fontFamily='Poppins-Medium'
                        fontSize={18}
                        textAlign='center'
                        sx={{
                            color: '#0c0048 !important'
                        }}
                    >
                        <Typography fontWeight={600}>Hello</Typography>, {userName}! 👋
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={5}
                    >
                        <IconButton
                            onClick={toggleDrawer}
                            color={haveNotifications ? 'warning' : 'neutral'}
                        >
                            <Badge invisible={!haveNotifications} color='primary' variant='solid' size='sm'>
                                <NotificationsActiveRoundedIcon color={haveNotifications ? 'warning' : 'neutral'} />
                            </Badge>
                        </IconButton>
                        <div
                            title={userName}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Badge
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeInset="14%"
                                color="success"
                                sx={{
                                    [`& .${badgeClasses.badge}`]: {
                                        '&::after': {
                                            position: 'absolute',
                                            top: -2,
                                            left: -2,
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            animation: 'ripple 1.2s infinite ease-in-out',
                                            border: '2px solid',
                                            borderColor: 'success.500',
                                            content: '""',
                                        },
                                    },
                                    '@keyframes ripple': {
                                        '0%': {
                                            transform: 'scale(1)',
                                            opacity: 1,
                                        },
                                        '100%': {
                                            transform: 'scale(1.5)',
                                            opacity: 0,
                                        },
                                    },
                                }}
                            >

                                <Avatar
                                    alt={userName}
                                    src={userProfileImage}
                                    slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        margin: '0 auto',
                                        '&:hover': {
                                            border: '3px solid green',
                                        }
                                    }}
                                />
                            </Badge>
                        </div>
                    </Stack>
                </Stack>
            </Card>


            {/* Notifications Window */}
            <NotificationSideBar open={openDrawer} toggleDrawer={toggleDrawer} />

        </>
    );
}

export default Header;
