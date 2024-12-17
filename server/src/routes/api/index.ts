import { Router } from 'express';
import { auth } from '../../middleware/auth';
import userRoutes from './userRoutes';
import companyRoutes from './companyRoutes';
import clientRoutes from './clientRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/companies', auth, companyRoutes);
router.use('/clients', auth, clientRoutes);

export default router; 