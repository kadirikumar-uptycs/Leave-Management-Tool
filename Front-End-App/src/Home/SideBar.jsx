import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Logo from '../assets/images/logo.svg';

const SideBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case '/':
        setActiveItem(0);
        break;
      case '/calendar':
        setActiveItem(1);
        break;
      case '/leaveHistory':
        setActiveItem(2);
        break;
      case '/users':
        setActiveItem(3);
        break;
      case '/analytics':
        setActiveItem(4);
        break;
      case '/admin':
        setActiveItem(5);
        break;
      default:
        setActiveItem(null);
        break;
    }
  }, [location.pathname]);

  return (
    <div className='side-bar'>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="" width="150" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/" className={`menu-item ${activeItem === 0 ? "active" : ''}`} style={{ color: 'inherit' }}>
          <div className="icon">
            <DashboardRoundedIcon />
          </div>
          <div className="text">Leave Dashboard</div>
        </Link>
        <Link to="/calendar" className={`menu-item ${activeItem === 1 ? "active" : ''}`} style={{ color: 'inherit' }}>
          <div className="icon">
            <CalendarMonthRoundedIcon />
          </div>
          <div className="text">Leave Calendar</div>
        </Link>
        <Link to="/leaveHistory" className={`menu-item ${activeItem === 2 ? "active" : ''}`} style={{ color: 'inherit' }}>
          <div className="icon">
            <HistoryIcon />
          </div>
          <div className="text">Leave History</div>
        </Link>
        <Link to="/users" className={`menu-item ${activeItem === 3 ? "active" : ''}`} style={{ color: 'inherit' }}>
          <div className="icon">
            <PeopleAltIcon />
          </div>
          <div className="text">Users</div>
        </Link>
        <Link to="/analytics" className={`menu-item ${activeItem === 4 ? "active" : ''}`} style={{ color: 'inherit' }}>
          <div className="icon">
            <QueryStatsIcon />
          </div>
          <div className="text">Analytics</div>
        </Link>
        <Link to="/admin" className={`menu-item ${activeItem === 5 ? "active" : ''}`} style={{ color: 'inherit' }}>
          <div className="icon">
            <AdminPanelSettingsIcon />
          </div>
          <div className="text">Admin</div>
        </Link>
        <div className={`menu-item ${activeItem === 6 ? "active" : ''}`} style={{ color: 'inherit' }}>
          <div className="icon">
            <LogoutRoundedIcon />
          </div>
          <div className="text">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;