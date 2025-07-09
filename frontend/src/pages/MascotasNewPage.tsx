import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAPI from '../contexts/useAPI';
import type { Mascota } from '../models/mascota';
import MascotaForm from '../components/MascotaForm';


const MascotasNewPage: React.FC = () => {
  const navigate = useNavigate();
  const api = useAPI()


  const handleGuardar = async(mascota: Mascota) => {
    await api.mascotas.create(mascota);
    navigate('/');
  }

  return (
    <MascotaForm
        disabled={false}
        onGuardar={handleGuardar}
        onCancelar={() => navigate('/')}
      />
  );
};

export default MascotasNewPage;
