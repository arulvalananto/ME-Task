import { ReactElement } from 'react';
import { Navigate } from 'react-router';

import constants from '../utils/constants';

interface PublicRouteProps {
    element: ReactElement;
    to: string;
}

const PublicRoute = ({ element, to }: PublicRouteProps) => {
    return !localStorage.getItem(constants.TOKEN_NAME) ? (
        <div>{element}</div>
    ) : (
        <Navigate to={to} replace />
    );  
};

export default PublicRoute;
