import express from 'express';
import { updateUser, deleteUser } from '../controllers/usersController.js';

const router = express.Router({ mergeParams: true });

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
