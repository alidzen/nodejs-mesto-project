import { Router } from 'express';
import { createDirector, getDirectors } from '../controllers/director';

const router = Router();

router.get('/', getDirectors);
router.post('/', createDirector);

export default router;
