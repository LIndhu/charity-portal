import { Router } from 'express';
//import { getPlatformStats, getDonorStats, getNgoStats } from '../../_disabled_controllers/analytics.controller.disabled';
//import { authenticate } from '../middleware/auth.middleware';
//import { requireRole } from '../middleware/role.middleware';

const router = Router();

//router.get('/platform', getPlatformStats);

//router.get('/donor', authenticate, requireRole(['DONOR']), getDonorStats);
//router.get('/ngo', authenticate, requireRole(['NGO']), getNgoStats);

export default router;

