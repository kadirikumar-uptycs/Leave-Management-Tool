import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import Avatar from '@mui/joy/Avatar';
import Drawer from '@mui/material/Drawer';

const Header = () => {
    let [openDrawer, setOpenDrawer] = useState(false);
    const userInfo = useSelector(state => state.auth.userInfo);
    const userName = userInfo.name;
    const userProfileImage = userInfo.profileImage;
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(prev => !prev);
    };
    return (
        <>
            <div className="name">
                <span>Hello, {userName}! 👋</span>
            </div>
            <div className='header-options'>
                <div className="notifications" onClick={toggleDrawer}>
                    <NotificationsActiveRoundedIcon />
                </div>
                <div className="profile" title={userName} sx>
                    <Avatar
                        alt={userName}
                        src={userProfileImage}
                        slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                        sx={{
                            width: 40,
                            height: 40,
                            margin: '0 auto',
                            marginTop: 1,
                            '&:hover': {
                                border: '1px solid cyan',
                                boxShadow: '0 0 2px cyan'
                            }
                        }}
                    />
                </div>
            </div>

            {/* Notifications Window */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer}
                PaperProps={{
                    sx: { width: "25%" },
                }}
            >
                <span style={{
                    margin: "30px 50px",
                    fontFamily: "Poppins-SemiBold",
                    fontSize: "21px",
                    color: "#a35"
                }}>No Notifications Yet</span>
            </Drawer>
        </>
    );
}

export default Header;
