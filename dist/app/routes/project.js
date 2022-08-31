import { Router } from 'express';
const router = Router();
import { createProject, fetchAllProjects, fetchOneProject, updateProject, deleteProject } from '../controllers/projectController.js';
router.post('/api/v1/projects', createProject);
router.get('/api/v1/projects', fetchAllProjects);
router.get('/api/v1/projects/:projectId', fetchOneProject);
router.patch('/api/v1/projects/:projectId', updateProject);
router.delete('/api/v1/projects/:projectId', deleteProject);
export { router };
//# sourceMappingURL=project.js.map