import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import type { Mascota } from '../models/mascota';

type MascotaRowProps = {
  mascota: Mascota;
  onVer: () => void;
  onEditar: () => void;
  onBorrar: () => void;
  onAdoptar?: () => void;
};

const MascotaRow: React.FC<MascotaRowProps> = ({ mascota, onVer, onEditar, onBorrar, onAdoptar }) => {
/*
  borró el handleBorrar y el navigate
  también había borrado el return y dejó solo su contenido,
  pero no llegué a ver que tocó para eliminarlo
  y que no le diera error, así que lo dejé,
  dijo que no pasaba nada si estaba el return
*/
  return ( // <- this
    <tr>
      <td>{mascota.nombre}</td>
      <td>{mascota.edad}</td>
      <td>{
        mascota.estado === 'ADOPTADA' ?
          <Badge bg="success">Adoptada</Badge>
        : mascota.estado === 'EN_ADOPCION' ?
          <Badge bg="warning">En adopción</Badge>
        : <Badge bg="danger">En diagnostico</Badge>
      }</td>
      <td>
        { mascota.estado === 'EN_ADOPCION' &&
          <Button
            variant="success"
            size="sm"
            className="me-1"
            onClick={onAdoptar}
          >
            Adoptar
          </Button>
        }
        <Button
          variant="info"
          size="sm"
          className="me-1"
          onClick={onVer}
        >
          Ver
        </Button>
        <Button
          variant="warning"
          size="sm"
          className="me-1"
          onClick={onEditar}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onBorrar}  // cambió a onBorrar
        >
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default MascotaRow;
