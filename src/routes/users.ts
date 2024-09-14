import { Router } from 'express';
import {
  getUser, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getUser);
router.patch('/me', updateProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
