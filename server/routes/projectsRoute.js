import express from 'express';
import {
	createProject,
	getProjects,
	getProject,
	updateProject,
	deleteProject,
} from '../controllers/projectsController.js';

const router = express.Router({ mergeParams: true });

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
