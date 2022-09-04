//~ Import Router
import { Router } from 'express';
const router = Router();

import { createProject, fetchAllProjects,fetchOneProject, fetchAllProjectsWithCategories, updateProject,deleteProject } from '../controllers/projectController.js';

//~ Home
router.post('/api/v1/projects', createProject);

router.get('/api/v1/projects', fetchAllProjects);
router.get('/api/v1/projects/:projectId(\\d+)', fetchOneProject);
router.get('/api/v1/projects/categories', fetchAllProjectsWithCategories);

router.patch('/api/v1/projects/:projectId(\\d+)', updateProject);
router.delete('/api/v1/projects/:projectId(\\d+)', deleteProject);



//~ Export router
export { router };
