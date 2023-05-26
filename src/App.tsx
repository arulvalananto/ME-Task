/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
import { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import actions from './context/actions';
import constants from './utils/constants';
import Dashboard from './pages/Dashboard';
import { verifyToken } from './utils/helpers';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { useContextState } from './context/Provider';

function App() {
    const [{}, dispatch]: any = useContextState();

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem(constants.TOKEN_NAME);
        if (token) {
            const response = await verifyToken(token);
            if (response?.payload?.id) {
                dispatch({
                    type: actions.SET_USER,
                    payload: response.payload,
                });
            } else {
                dispatch({
                    type: actions.LOGOUT,
                    payload: {},
                });
            }
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/sign-in"
                    element={<PublicRoute element={<Login />} to="/" />}
                />
                <Route
                    path="/"
                    element={
                        <PrivateRoute element={<Dashboard />} to="/sign-in" />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
