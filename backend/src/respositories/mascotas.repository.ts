import { ObjectId, Collection } from 'mongodb';
import { getLogger } from '../config/logger.config';
import { getDb } from '../config/mongo.config';
import { Mascota } from '../models/mascota';
import { IdNotFoundError } from '../errors/idNotFound.error';
import { InvalidEntityDataError } from '../errors/invalidEntityData.error';
import { InvalidIdError } from '../errors/invalidId.error';

export class MascotasRepository {
  private collection : Collection<Mascota>;

  constructor() {
    getLogger().debug('Inicializando repositorio...');
    this.collection = getDb().collection<Mascota>('mascotas');
  }

  getAll = async (): Promise<(Mascota & {_id: string})[]> => {
    const result = await this.collection.find().toArray();
    return result.map((e) => ({...e, _id: e._id.toHexString() }))
  }

  getById = async (id: string): Promise<Mascota & {_id: string}> => {
    const result = await this.collection.findOne({ _id: this.getObjectId(id) })
    if (result === null) {
      throw new IdNotFoundError("No hay mascota con id: " + id);
    }
    return { ...result, _id: result._id.toHexString() };
  }

  create = async (mascota: Mascota): Promise<Mascota & {_id: string}> => {
    try {
      delete mascota['_id'];
      mascota.fechaIngreso = new Date();
      const result = await this.collection.insertOne(mascota);
      return { ...mascota, _id: result.insertedId.toHexString() };
    } catch (err: any) {
      getLogger().debug(err.message);
      throw new InvalidEntityDataError('No se pudo guardar la mascota')
    }
  }

  update = async (id: string, data: Partial<Mascota>): Promise<Mascota & {_id: string}> => {
    try {
      delete data['_id'];     //usó el mismo que tiene el create para borrar el _id
      const result = await this.collection.findOneAndUpdate(
        { _id: this.getObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      );
      if (result === null) {
        throw new IdNotFoundError("No hay mascota con id: " + id);
      }
      return { ...result, _id: result._id.toHexString()};
    }
    catch (err: any) {
      getLogger().debug(err.message);
      throw new InvalidEntityDataError('No se pudo guardar la mascota')
    }
  }

  delete = async (id: string): Promise<boolean> => {
    const result = await this.collection.deleteOne({ _id: this.getObjectId(id) });
    if (result.deletedCount === 0) {
      throw new IdNotFoundError("No hay mascota con id: " + id);
    }
    return result.deletedCount === 1;
  }

  getObjectId = (id: string): ObjectId => {
    try {
      return new ObjectId(id)
    } catch (err) {
      throw new InvalidIdError(`El id "${id}" es invalido. Se debe pasar un id hexadecimal de 24 caracteres.`)
    }
  }
}
