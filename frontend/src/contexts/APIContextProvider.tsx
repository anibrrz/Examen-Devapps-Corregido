import React from 'react';
import APIContext from './APIContext';
import api from '../api/mascotas.api';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const APIContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <APIContext.Provider
        value={{
            mascotas: api.mascotas
        }}
    >
        {children}
    </APIContext.Provider>
);

export default APIContextProvider;