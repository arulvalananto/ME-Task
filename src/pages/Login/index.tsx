/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';
import { ILoginForm } from './ILogin';
import { ICredentials } from './ILogin';
import actions from '../../context/actions';
import Loader from '../../components/Loader';
import constants from '../../utils/constants';
import { loginData } from '../../static/formData';
import { useContextState } from '../../context/Provider';
import loginDetails from '../../static/loginDetails.json';
import {
    generateToken,
    isValidEmail,
    isValidPassword,
} from '../../utils/helpers';

const initialState: ICredentials = {
    email: '',
    password: '',
};

const Login = () => {
    const [credentials, setCredentials] = useState(initialState);
    const [error, setError] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const navigate = useNavigate();
    const [{}, dispatch]: any = useContextState();

    const handleChangeCredentials = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setGlobalError('');
        setError(initialState);

        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const isValidCredentials = (): boolean => {
        const { email, password } = credentials;

        let emailErrorMessage = '';
        let passwordErrorMessage = '';

        if (!email || !isValidEmail(email))
            emailErrorMessage = constants.EMAIL_INVALID;

        if (!password || !isValidPassword(password))
            passwordErrorMessage = constants.PASSWORD_INVALID;

        if (emailErrorMessage || passwordErrorMessage) {
            setError({
                ...error,
                email: emailErrorMessage,
                password: passwordErrorMessage,
            });
            setIsLoading(false);
            return false;
        }

        return true;
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        setIsLoading(true);
        if (!isValidCredentials()) {
            return;
        }

        const { email, password } = credentials;
        const user = loginDetails.find(
            (user) => user.email === email && user.password === password
        );

        if (user?.id) {
            const data = { ...user, password: undefined };
            const token = await generateToken(data);

            localStorage.setItem(constants.TOKEN_NAME, token);
            dispatch({
                type: actions.SET_USER,
                payload: data,
            });
            navigate('/');
        } else setGlobalError('User not found');
        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <section id="login" className="login">
                <header>
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">Please enter your details.</p>
                </header>
                {globalError && (
                    <p className="login-error-message">{globalError}</p>
                )}
                <form onSubmit={handleLogin} className="login-form">
                    {loginData.map(({ type, placeholder }: ILoginForm) => (
                        <div key={type} className="login-form-group">
                            <label htmlFor={type} className="login-form-label">
                                {type}
                            </label>
                            <input
                                id={type}
                                type={type}
                                name={type}
                                placeholder={placeholder}
                                value={credentials[type]}
                                onChange={handleChangeCredentials}
                                aria-label={type}
                                className="login-form-input"
                            />
                            <span className="login-form-input-error">
                                {error[type]}
                            </span>
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="login-submit-button"
                    >
                        {isLoading ? <Loader /> : 'Sign in'}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Login;
