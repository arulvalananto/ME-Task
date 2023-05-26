/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react';
import { IProviderProps } from './interface';

export const StateContext = createContext({});

export const Provider = ({
    reducer,
    initialState,
    children,
}: IProviderProps) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useContextState = () => useContext(StateContext);
