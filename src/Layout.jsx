import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './Home/SideBar';
import Header from './Home/Header';
import './App.css';
const Layout = () => {
    return (
        <div className='container'>
            <SideBar />
            <div className="main">
                <div className="Header">
                    <Header />
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;