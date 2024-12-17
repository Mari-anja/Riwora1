import { Router, Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { auth, requireRole } from '../../middleware/auth';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.createUser(req.body);
    void res.status(201).json(user);
  } catch (error) {
    void res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    void res.json(result);
  } catch (error) {
    void res.status(401).json({ error: (error as Error).message });
  }
});

router.get('/me', auth, (req: Request, res: Response): void => {
  void res.json(req.user);
});

router.get('/team', auth, requireRole(['admin']), async (req: Request, res: Response): Promise<void> => {
  try {
    const teamMembers = await UserService.getTeamMembers(req.user.company);
    void res.json(teamMembers);
  } catch (error) {
    void res.status(400).json({ error: (error as Error).message });
  }
});

export default router; 