import authRoutes from './auth.route.js'
import leadRoutes from './lead.route.js'
import express from 'express';

const router = express.Router();


router.use('/auth', authRoutes);

router.use('/leads', leadRoutes);
    

export default router
