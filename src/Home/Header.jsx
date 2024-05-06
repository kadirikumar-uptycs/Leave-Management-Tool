import React, { useState } from 'react';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import Drawer from '@mui/material/Drawer';
import ProfileImage from '../assets/images/profile.png';

const Header = () => {
    let [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(prev => !prev);
    };
    return (
        <>
            <div className="name">
                <span>Hello, Captain Jack Sparrow!</span>
            </div>
            <div className='header-options'>
                <div className="notifications" onClick={toggleDrawer}>
                    <NotificationsActiveRoundedIcon />
                </div>
                <div className="profile">
                    <img src={ProfileImage} alt="" width="30" />
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
