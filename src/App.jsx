import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import ErrorBoundary from './common/ErrorBoundary';
import PageNotFound from './common/PageNotFound';
import LoginPage from './Login/LoginPage';
import HomePage from './Home/HomePage';
import Calendar from './Calendar/Calendar';
import LeavesFullHistory from './Leaves/LeavesFullHistory';
import Users from './Users/users';
import Admin from './Admin/Admin';
import Layout from './Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={
        <ErrorBoundary>
          <LoginPage />
        </ErrorBoundary>
      } />
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
      <Route path='*' element={
        <ErrorBoundary>
          <PageNotFound />
        </ErrorBoundary>
      } />
    </Route>
  )
);

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}