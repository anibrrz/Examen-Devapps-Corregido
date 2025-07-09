import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAsyncEffect from '../helpers/useAsyncEffect';
import useAPI from '../contexts/useAPI';
import type { Mascota, MascotaWithId } from '../models/mascota';
import MascotaForm from '../components/MascotaForm';

const MascotasEditPage: React.FC = () => {
  const [mascota, setMascota] = useState<MascotaWithId>({} as MascotaWithId);
  const navigate = useNavigate();
  const api = useAPI();
  const { id } = useParams();

  useAsyncEffect(async () => {
    const result = await api.mascotas.get(id!);
    setMascota(result);
  }, []);

  const handleGuardar = async(mascotaActualizada: Mascota) => {
    console.log('Mascota que se quiere guardar en el frontend:', mascotaActualizada);
    await api.mascotas.update(id!, mascotaActualizada);
    navigate('/');
  };

  return <>
    { !mascota ?
      <Alert variant="info">
        Cargando...
      </Alert>
      :
      <MascotaForm
        mascota={mascota}
        disabled={false}
        onGuardar={handleGuardar}
        onCancelar={() => navigate('/')}
      />
    }
    </>
};

export default MascotasEditPage;
