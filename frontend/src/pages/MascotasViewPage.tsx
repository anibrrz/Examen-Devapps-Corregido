import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAsyncEffect from '../helpers/useAsyncEffect';
import useAPI from '../contexts/useAPI';
import type { MascotaWithId } from '../models/mascota';
import MascotaForm from '../components/MascotaForm';


const MascotasViewPage: React.FC = () => {
  const [mascota, setMascota] = useState<MascotaWithId>({} as MascotaWithId);
  const navigate = useNavigate();
  const api = useAPI();
  const { id } = useParams();

  useAsyncEffect(async () => {
    const result = await api.mascotas.get(id!);
    setMascota(result);
  }, []);

   return <>
      { !mascota ?
        <Alert variant="info">
          Cargando...
        </Alert>
        :
        <MascotaForm
          mascota={mascota}
          disabled={true}
          onGuardar={() => {}}
          onCancelar={() => navigate('/')}
        />
      }
      </>
};

export default MascotasViewPage;
