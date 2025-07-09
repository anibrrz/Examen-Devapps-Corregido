import React from 'react';
import { Button, Row, Col, Stack, Table } from 'react-bootstrap';
import MascotaRow from './MascotaRow';
import type { MascotaWithId } from '../models/mascota';


type MascotasTableProps = {
  mascotas: MascotaWithId[];
  onCrearNueva: () => void;
  onVerUno: (id: string) => void;
  onEditarUno: (id: string) => void;
  onBorrarUno: (id: string) => void;
  onAdoptarUno: (id: string) => void;
};


const MascotasTable: React.FC<MascotasTableProps> = ({ mascotas, onCrearNueva, onVerUno, onEditarUno, onBorrarUno, onAdoptarUno }) => (
  <Stack gap={3}>
    <Row className="align-items-center">
      <Col><h2>Mascotas</h2></Col>
      <Col className="text-end">
        <Button variant="success" onClick={onCrearNueva}>
          Crear nueva
        </Button>
      </Col>
    </Row>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {mascotas.map((mascota, index) => (
          <MascotaRow
            key={index}
            mascota={mascota}
            onVer={() => onVerUno(mascota._id)}
            onEditar={() => onEditarUno(mascota._id)}
            onBorrar={() => onBorrarUno(mascota._id)}
            onAdoptar={() => onAdoptarUno(mascota._id)}
          />
        ))}
      </tbody>
    </Table>
  </Stack>
);

export default MascotasTable;
