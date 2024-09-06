import { Router } from 'express';
import { createFilm, getFilms } from '../controllers/films';

const router = Router();
router.get('/', getFilms);

// сработает при POST-запросе на URL /films
router.post('/', createFilm);

export default router;
