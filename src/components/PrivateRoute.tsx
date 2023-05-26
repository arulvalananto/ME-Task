import { ReactElement } from 'react';
import { Navigate } from 'react-router';

import constants from '../utils/constants';

interface PrivateRouteProps {
    element: ReactElement;
    to: string;
}

const PrivateRoute = ({ element, to }: PrivateRouteProps) => {
    return localStorage.getItem(constants.TOKEN_NAME) ? (
        <div>{element}</div>
    ) : (
        <Navigate to={to} replace />
    );
};

export default PrivateRoute;
