import express from 'express';
import { checkAuthentication } from '../middlewares/checkAuthentication.js';
import authRoute from './authRoute.js';
import usersRoute from './usersRoute.js';
import projectsRoute from './projectsRoute.js';
import tasksRoute from './tasksRoute.js';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoute);
router.use('/users', checkAuthentication, usersRoute);
router.use('/projects', checkAuthentication, projectsRoute);
router.use('/projects/:projectId/tasks', checkAuthentication, tasksRoute);

export default router;
