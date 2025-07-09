import axios from "axios";
import type { Mascota, MascotaWithId } from "../models/mascota";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL!,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

const api = {
    mascotas: {
        all: async (): Promise<MascotaWithId[]> => {
            const result = await axiosApi.get<MascotaWithId[]>(`/mascotas`);
            if (result.status === 200) return result.data;
            return [];
        },
        get: async (id: string): Promise<MascotaWithId> => {
            const result = await axiosApi.get<MascotaWithId>(`/mascotas/${id}`);
            if (result.status === 200) return result.data;
            return undefined as unknown as MascotaWithId;
        },
        create: async (mascota: Partial<Mascota>): Promise<MascotaWithId> => {
            const result = await axiosApi.post<MascotaWithId>(`/mascotas`, mascota);
            if (result.status === 200) return result.data;
            return undefined as unknown as MascotaWithId;
        },
        update: async (id: string, mascota: Partial<Mascota>): Promise<MascotaWithId> => {
            const result = await axiosApi.put<MascotaWithId>(`/mascotas/${id}`, mascota);
            if (result.status === 200) return result.data;
            return undefined as unknown as MascotaWithId;
        },
        delete: async (id: string): Promise<boolean> => {
            const result = await axiosApi.delete<boolean>(`/mascotas/${id}`);
            if (result.status === 200) return result.data;
            return false;
        },
    }
}

export default api;