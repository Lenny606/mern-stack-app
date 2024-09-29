// src/contexts/LoggerContext.js

import React, { createContext, useContext } from 'react';
import Logger from './logger';

const LoggerContext = createContext(Logger);

export const useLogger = () => useContext(LoggerContext);

export const LoggerProvider = ({ children }) => {
    return (
        <LoggerContext.Provider value={Logger}>
            {children}
        </LoggerContext.Provider>
    );
};