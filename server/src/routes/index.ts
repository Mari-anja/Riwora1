import { Router, Request, Response } from 'express';

const router = Router();

// TODO: Add routes here
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export default router; 