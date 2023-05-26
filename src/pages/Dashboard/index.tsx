/* eslint-disable @typescript-eslint/no-explicit-any */
import './index.css';
import { useContextState } from '../../context/Provider';
import actions from '../../context/actions';
import constants from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import Todos from '../../components/Todos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const [{ user }, dispatch]: any = useContextState();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem(constants.TOKEN_NAME);
        dispatch({
            type: actions.LOGOUT,
            payload: {},
        });
        navigate('/sign-in');
    };

    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <img
                    className="dashboard-image"
                    src="https://marquee-equity.com/wp-content/themes/marquee-theme/img/m-logo.svg"
                    alt="Todo logo"
                />
                <div className="dashboard-info">
                    <img
                        src="https://picsum.photos/100/100"
                        alt="profile pic"
                        className="dashboard-profilepic"
                    />
                    <p className="dashboard-username">{user?.name}</p>
                    <button
                        type="button"
                        onClick={logout}
                        className="dashboard-logout"
                    >
                        Logout
                    </button>
                    <button
                        type="button"
                        onClick={logout}
                        className="dashboard-logout-icon"
                        aria-label="Logout"
                    >
                        <FontAwesomeIcon icon={faPowerOff} />
                    </button>
                </div>
            </nav>
            <div>
                <Todos />
            </div>
        </div>
    );
};

export default Dashboard;
