import { Request, Response } from 'express';
import { getLogger } from '../config/logger.config';
import { MascotasRepository } from '../respositories/mascotas.repository';

export class MascotasController {
  private repo : MascotasRepository;

  constructor() {
    getLogger().debug('Inicializando el controller...');
    this.repo = new MascotasRepository();
  }

  getAllMascotas = async (_: Request, res: Response) => {
    const mascotas = await this.repo.getAll();
    res.json(mascotas);
  };

  getMascotaById = async (req: Request, res: Response) => {
    const mascota = await this.repo.getById(req.params.id);
    res.json(mascota);
  };

  crearMascota = async (req: Request, res: Response) => {
    const nueva = await this.repo.create(req.body);
    res.status(201).json(nueva);
  };

  actualizarMascota = async (req: Request, res: Response) => {
    const actualizada = await this.repo.update(req.params.id, req.body);
    res.json(actualizada);
  };

  eliminarMascota = async (req: Request, res: Response) => {
    await this.repo.delete(req.params.id);
    res.json({ mensaje: 'Eliminada' });
  };
}
