export type EstadoMascota = 'EN_DIAGNOSTICO' | 'EN_ADOPCION' | 'ADOPTADA';

export interface Mascota {
  nombre: string;
  edad: number;
  estado: EstadoMascota;
  descripcion?: string;
  fechaIngreso?: Date;
}
