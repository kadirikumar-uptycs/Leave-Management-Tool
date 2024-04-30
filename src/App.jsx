import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import LoginPage from './Login/LoginPage';
import HomePage from './Home/HomePage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route
                path="login"
                element={<LoginPage />}
            />
            <Route
                index
                element={<HomePage />}
            />         
        </Route>
    )
);

export default function App() {

    return (
            <RouterProvider router={router} />
    )
}
