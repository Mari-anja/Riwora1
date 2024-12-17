import { Router, Request, Response, RequestHandler } from 'express';
import { requireRole } from '../../middleware/auth';

const router = Router();

// Get company profile
const getCompanyProfile: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    res.json(req.user.company);
  } catch (error) {
    next(error);
  }
};

router.get('/', getCompanyProfile);

// Update company settings
const updateCompanySettings: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const company = await req.user.company.updateOne({ settings: req.body });
    res.json(company);
  } catch (error) {
    next(error);
  }
};

router.patch('/settings', requireRole(['admin']), updateCompanySettings);

export default router; 