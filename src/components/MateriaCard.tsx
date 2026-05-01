import React from 'react';

type Role = 'profesor' | 'alumno' | 'delegado';

interface Estudiante {
  id: number;
  full_name: string;
  email: string;
}

interface Materia {
  id: number;
  nombre: string;
  color: string;
  estudiantes: Estudiante[];
}

interface MateriaCardProps {
  materia: Materia;
  userRole: Role;
}

const MateriaCard: React.FC<MateriaCardProps> = ({ materia, userRole }) => {
  const mostrarEstudiantes = userRole === 'profesor' || userRole === 'delegado';

  return (
    <div
      style={{
        borderLeft: `4px solid ${materia.color}`,
        padding: '16px',
        margin: '12px 0',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
      }}
    >
      <h2 style={{ color: materia.color, marginTop: 0 }}>{materia.nombre}</h2>
      
      {mostrarEstudiantes && (
        <div>
          <h3>Estudiantes inscritos ({materia.estudiantes.length})</h3>
          <ul>
            {materia.estudiantes.map((estudiante) => (
              <li key={estudiante.id}>{estudiante.full_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MateriaCard;