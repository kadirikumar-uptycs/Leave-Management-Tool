import React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider
} from "react-router-dom";
import { Provider } from 'react-redux'
import ErrorBoundary from './common/ErrorBoundary';
import { SnackbarProvider } from './hooks/SnackBarProvider';
import PageNotFound from './common/PageNotFound';
import LoginPage from './Login/LoginPage';
import HomePage from './Home/HomePage';
import Calendar from './Calendar/Calendar';
import LeavesFullHistory from './Leaves/LeavesFullHistory';
import Users from './Users/Users';
import Admin from './Admin/Admin';
import Analytics from './Analytics/Analytics';
import Layout from './Layout';
import store from './store';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="calendar" element={
					<ErrorBoundary>
						<Calendar />
					</ErrorBoundary>
				} />
				<Route path="/leaveHistory" element={
					<ErrorBoundary>
						<LeavesFullHistory />
					</ErrorBoundary>
				} />
				<Route path="admin" element={
					<ErrorBoundary>
						<Admin />
					</ErrorBoundary>
				} />
				<Route path="users" element={
					<ErrorBoundary>
						<Users />
					</ErrorBoundary>
				} />
				<Route path="analytics" element={
					<ErrorBoundary>
						<Analytics />
					</ErrorBoundary>
				} />
				<Route path='*' element={
					<ErrorBoundary>
						<PageNotFound />
					</ErrorBoundary>
				} />
			</Route>
			<Route path="login" element={
				<ErrorBoundary>
					<LoginPage />
				</ErrorBoundary>
			} />
		</Route>
	)
);

export default function App() {
	return (
		<Provider store={store}>
			<SnackbarProvider>
				<ErrorBoundary>
					<RouterProvider router={router} />
				</ErrorBoundary>
			</SnackbarProvider>
		</Provider>
	);
}