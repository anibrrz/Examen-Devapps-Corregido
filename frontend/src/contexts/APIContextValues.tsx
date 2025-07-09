import api from '../api/mascotas.api';

export interface APIContextValues {
    mascotas: typeof api.mascotas;
}
