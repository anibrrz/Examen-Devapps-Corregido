import { ExpressRouter } from '../helpers/express.router';
import { MascotasController } from '../controllers/mascotas.controller';

export const MascotasRouter = ExpressRouter((router) => {
    const controller = new MascotasController();

    router.get('/', controller.getAllMascotas);
    router.get('/:id', controller.getMascotaById);
    router.post('/', controller.crearMascota);
    router.put('/:id', controller.actualizarMascota);
    router.delete('/:id', controller.eliminarMascota);
});
