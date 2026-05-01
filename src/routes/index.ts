import { Router } from 'express';
import authRoutes from './authRoutes';
import tareaRoutes from './tareaRoutes';
import horarioRoutes from './horarioRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tareas', tareaRoutes);
router.use('/', horarioRoutes);

export default router;

