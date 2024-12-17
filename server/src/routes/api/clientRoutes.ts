import { Router, Request, Response } from 'express';
import { Client } from '../../models/Client';

const router = Router();

// Get all clients for company
router.get('/', async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({ company: req.user.company });
    res.json(clients);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Create new client
router.post('/', async (req: Request, res: Response) => {
  try {
    const client = new Client({
      ...req.body,
      company: req.user.company
    });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router; 