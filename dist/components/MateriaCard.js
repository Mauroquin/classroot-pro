"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MateriaCard = ({ materia, userRole }) => {
    const mostrarEstudiantes = userRole === 'profesor' || userRole === 'delegado';
    return (<div style={{
            borderLeft: `4px solid ${materia.color}`,
            padding: '16px',
            margin: '12px 0',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
        }}>
      <h2 style={{ color: materia.color, marginTop: 0 }}>{materia.nombre}</h2>
      
      {mostrarEstudiantes && (<div>
          <h3>Estudiantes inscritos ({materia.estudiantes.length})</h3>
          <ul>
            {materia.estudiantes.map((estudiante) => (<li key={estudiante.id}>{estudiante.full_name}</li>))}
          </ul>
        </div>)}
    </div>);
};
exports.default = MateriaCard;
