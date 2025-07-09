import React from 'react';
import api from '../api/mascotas.api';
import type { APIContextValues } from './APIContextValues';

const APIContext: React.Context<APIContextValues> = React.createContext<APIContextValues>({ mascotas: api.mascotas });

export default APIContext;
