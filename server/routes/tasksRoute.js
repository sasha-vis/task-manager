import express from 'express';
import {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
} from '../controllers/tasksController.js';

const router = express.Router({ mergeParams: true });

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:taskId', getTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;
