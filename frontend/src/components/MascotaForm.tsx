import React, { useState, useEffect } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';
import type { Mascota } from '../models/mascota';

type MascotaFormProps = {
  mascota?: Mascota;
  disabled: boolean;
  onGuardar?: (m: Mascota) => void;
  onCancelar: () => void;
};

const estados = ['EN_DIAGNOSTICO', 'EN_ADOPCION', 'ADOPTADA']

const MascotaForm: React.FC<MascotaFormProps> = ({
  mascota,
  disabled,
  onGuardar,
  onCancelar
}) => {
  const defaultMascota: Mascota = {
    nombre: '',
    edad: 0,
    estado: 'ADOPTADA',
    descripcion: ''
  }
  const [formData, setFormData] = useState<Mascota>(mascota ?? defaultMascota);

  useEffect(() => {
    if (mascota) {
      setFormData(mascota);
    }
  }, [mascota]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'edad' ? Number(value) : value,
    });
  };

  const handleSubmit = () => {
    onGuardar?.(formData);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="edad">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          disabled={disabled}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="estado">
        <Form.Label>Estado</Form.Label>
        <Form.Select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          disabled={disabled}
        >
          {estados.map((op) => (
            <option key={op} value={op}>
              {op.replace('_', ' ')}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="descripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="descripcion"
          rows={3}
          value={formData.descripcion}
          onChange={handleChange}
          disabled={disabled}
        />
      </Form.Group>

      <Stack direction="horizontal" gap={2}>
        { !disabled && <Button variant="success" onClick={handleSubmit}>
            Guardar
          </Button>
        }
        <Button variant="secondary" onClick={onCancelar}>
          {disabled ? 'Volver' : 'Cancelar'}
        </Button>
      </Stack>
    </Form>
  );
};

export default MascotaForm;
