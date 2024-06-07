import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HistoryIcon from '@mui/icons-material/History';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
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
					<Link to={!userRoles.includes('Manager')?'/':'/admin'}>
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
							(!userRoles.includes('Manager') || userRoles.includes('Admin'))
							&&
							(<Link to="/" className={`menu-item ${activeItem === 0 ? "active" : ''}`} style={{ color: 'inherit' }}>
								<Stack
									direction='row'
									alignItems='center'
									justifyContent='space-between'
									spacing={1}
									paddingLeft={2}
								>
									<DashboardRoundedIcon className='icon' />
									<div className="text">Leave Dashboard</div>
								</Stack>
							</Link>)
						}
						<Link to="/calendar" className={`menu-item ${activeItem === 1 ? "active" : ''}`} style={{ color: 'inherit' }}>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
								spacing={1}
								paddingLeft={2}
							>
								<CalendarMonthRoundedIcon className='icon' />
								<div className="text">Leave Calendar</div>
							</Stack>
						</Link>
						{
							(!userRoles.includes('Manager') || userRoles.includes('Admin'))
							&&
							(<Link to="/leaveHistory" className={`menu-item ${activeItem === 2 ? "active" : ''}`} style={{ color: 'inherit' }}>
								<Stack
									direction='row'
									alignItems='center'
									justifyContent='space-between'
									spacing={1}
									paddingLeft={2}
								>
									<HistoryIcon className='icon' />
									<div className="text">Leave History</div>
								</Stack>
							</Link>)
						}
						<Link to="/users" className={`menu-item ${activeItem === 3 ? "active" : ''}`} style={{ color: 'inherit' }}>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
								spacing={1}
								paddingLeft={2}
							>
								<PeopleAltIcon className='icon' />
								<div className="text">Users</div>
							</Stack>
						</Link>
						{
							(userRoles.includes('Admin') || userRoles.includes('Manager'))
							&&
							<Link to="/analytics" className={`menu-item ${activeItem === 4 ? "active" : ''}`} style={{ color: 'inherit' }}>
								<Stack
									direction='row'
									alignItems='center'
									justifyContent='space-between'
									spacing={1}
									paddingLeft={2}
								>
									<QueryStatsIcon className='icon' />
									<div className="text">Analytics</div>
								</Stack>
							</Link>
						}
						{
							(userRoles.includes('Admin') || userRoles.includes('Manager'))
							&&
							<Link to="/admin" className={`menu-item ${activeItem === 5 ? "active" : ''}`} style={{ color: 'inherit' }}>
								<Stack
									direction='row'
									alignItems='center'
									justifyContent='space-between'
									spacing={1}
									paddingLeft={2}
								>
									<AdminPanelSettingsIcon className='icon' />
									<div className="text">Admin</div>
								</Stack>
							</Link>
						}
						<div
							className={`menu-item ${activeItem === 6 ? "active" : ''}`}
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