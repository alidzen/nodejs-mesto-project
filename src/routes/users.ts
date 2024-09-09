import { Router } from 'express';
import {
  createUser, getUser, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
