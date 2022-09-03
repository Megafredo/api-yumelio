//~ Import Router
import { Router } from 'express';
const router = Router();

import { createProject, fetchAllProjects,fetchOneProject, fetchAllProjectsWithCategories, updateProject,deleteProject } from '../controllers/projectController.js';

//~ Home
router.post('/api/v1/projects', createProject);

router.get('/api/v1/projects', fetchAllProjects);
router.get('/api/v1/projects/:projectId', fetchOneProject);
router.get('/api/v1/projects/categories', fetchAllProjectsWithCategories);

router.patch('/api/v1/projects/:projectId', updateProject);
router.delete('/api/v1/projects/:projectId', deleteProject);



//~ Export router
export { router };
