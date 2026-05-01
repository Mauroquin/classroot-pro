import { Router } from 'express';
import { 
  getHorarioSemanal, 
  getHorarioHoy, 
  getProximaClase,
  crearHorario,
  actualizarHorario,
  eliminarHorario,
  getClasesPorDiaSemana
} from '../controllers/horarioController';
import { verificarToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/horario/semanal', getHorarioSemanal);
router.get('/horario/hoy', getHorarioHoy);
router.get('/horario/proxima', getProximaClase);
router.get('/horario/dia/:dia', getClasesPorDiaSemana);

router.post('/horario', verificarToken, crearHorario);
router.put('/horario/:id', verificarToken, actualizarHorario);
router.delete('/horario/:id', verificarToken, eliminarHorario);

export default router;