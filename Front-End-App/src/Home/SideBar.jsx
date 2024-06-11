import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Logo from '../assets/images/logo.svg';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import ConfirmationSnackBar from '../common/ConfirmationSnackBar';
import { logout } from '../store/authSlice';
import { useSnackbar } from '../hooks/SnackBarProvider';
import axios from 'axios';
import config from '../config';

const pages = [
	{
		name: 'Home',
		route: '/',
		icon: <DashboardRoundedIcon className='icon' />,
		checkAccess: (userRoles) => !userRoles.includes('Manager') || userRoles.includes('Admin')
	},
	{
		name: 'Holiday Calendar',
		route: '/calendar',
		icon: <CalendarMonthRoundedIcon className='icon' />,
		checkAccess: (userRoles) => true
	},
	{
		name: 'Leaves History',
		route: '/leaveHistory',
		icon: <HistoryIcon className='icon' />,
		checkAccess: (userRoles) => !userRoles.includes('Manager') || userRoles.includes('Admin')
	},
	{
		name: 'Leave Tracker',
		route: '/leaveTracker',
		icon: <TrackChangesIcon className='icon' />,
		checkAccess: (userRoles) => userRoles.includes('Admin') || userRoles.includes('Manager')
	},
	{
		name: 'Users',
		route: '/users',
		icon: <PeopleAltIcon className='icon' />,
		checkAccess: (userRoles) => true
	},
	{
		name: 'Analytics',
		route: '/analytics',
		icon: <QueryStatsIcon className='icon' />,
		checkAccess: (userRoles) => userRoles.includes('Admin') || userRoles.includes('Manager')
	},
	{
		name: 'Admin',
		route: '/admin',
		icon: <AdminPanelSettingsIcon className='icon' />,
		checkAccess: (userRoles) => userRoles.includes('Admin') || userRoles.includes('Manager')
	}

]


const SideBar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const openSnackBar = useSnackbar();
	const [activeItem, setActiveItem] = useState(null);
	const [open, setOpen] = useState(false);

	let userInfo = useSelector(state => state.auth.userInfo);
	let userRoles = userInfo?.roles || ['User'];

	useEffect(() => {
		const currentPath = location.pathname;
		const currentPage = pages.find((page, index) => {
			if (page.route === currentPath) {
				setActiveItem(index);
				return true;
			} else {
				return false
			}
		});
		if (!currentPage)
			setActiveItem(null)
	}, [location.pathname]);

	const handleSnackBarClose = () => setOpen(false);
	const onLogoutResponse = async (wantLogout) => {
		setOpen(false);
		if (!wantLogout)
			return
		openSnackBar('Logging Out...');
		try {
			await axios.delete(`${config.SERVER_BASE_ADDRESS}/auth/logout`, { withCredentials: true });
			openSnackBar('Logged Out Successfully!', 'success');
			dispatch(logout());
			window.location.href = '/login';
		} catch (err) {
			console.log(err);
			openSnackBar('Error occurred while Logging Out, please try again', 'danger');
		}
	}

	return (
		<>
			<Card
				sx={{
					position: 'fixed !important',
					left: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: `${100 / 6.5}vw`,
					height: '100vh',
					backgroundColor: '#eff6ff',
					userSelect: 'none',
					borderRadius: 0,
					padding: '0 2px',
					paddingRight: 0
				}}
			>
				<CardOverflow
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '20px',
						marginRight: '5px',
						marginBottom: '43px'
					}}
				>
					<Link to={!userRoles.includes('Manager') ? '/' : '/admin'}>
						<img src={Logo} alt="Uptycs Logo" width="150" />
					</Link>
				</CardOverflow>
				<CardContent
					sx={{
						width: '100%'
					}}
				>
					<Stack
						direction='column'
						alignItems='center'
						justifyContent='space-around'
					>
						{
							pages.map((page, index) => (
								(page.checkAccess(userRoles))
								&&
								(<Link to={page.route} className={`menu-item ${activeItem === index ? "active" : ''}`} style={{ color: 'inherit' }} key={index}>
									<Stack
										direction='row'
										alignItems='center'
										justifyContent='space-between'
										spacing={1}
										paddingLeft={activeItem === index? 1.5:2}
									>
										{page.icon}
										<div className="text">{page.name}</div>
									</Stack>
								</Link>)
							))
						}
						<div
							className="menu-item"
							style={{ color: 'inherit' }}
							onClick={() => setOpen(true)}
						>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
								spacing={1}
								paddingLeft={2}
							>
								<LogoutRoundedIcon className='icon' />
								<div className="text">Logout</div>
							</Stack>
						</div>
					</Stack>
				</CardContent>
			</Card >
			{/* Confirmation Snack Bar */}
			<ConfirmationSnackBar
				open={open}
				onClose={handleSnackBarClose}
				message='Do you want to Log out?'
				onResponse={onLogoutResponse}
			/>
		</>
	);
};

export default SideBar;