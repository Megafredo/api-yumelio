import { Router } from 'express';
const router = Router();
import { createProject, fetchAllProjects, fetchOneProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';
import { projectSchema } from '../schema/project.schema.js';
import { validate } from '../middlewares/validateSchema.js';
router.post('/api/v1/projects', validate(projectSchema), [validateToken, auth, admin], createProject);
router.get('/api/v1/users/:userId(\\d+)/projects', fetchAllProjects);
router.get('/api/v1/users/:userId(\\d+)/projects/:projectId(\\d+)', fetchOneProject);
router.patch('/api/v1/projects/:projectId(\\d+)', validate(projectSchema), [validateToken, auth, admin], updateProject);
router.delete('/api/v1/projects/:projectId(\\d+)', [validateToken, auth, admin], deleteProject);
export { router };
//# sourceMappingURL=project.js.map