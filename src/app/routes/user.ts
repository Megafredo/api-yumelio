//~ Import Router
import { Router } from 'express';
const router = Router();

import { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser } from '../controllers/userController.js';

import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';
import { getRefreshToken } from '../middlewares/getRefreshToken.js';
import { refreshToken} from '../services/jsonWebToken.js';

//~ Home
router.post('/api/v1/signup', doSignUp);
router.post('/api/v1/signin', doSignIn);
router.get('/api/v1/signout',[getRefreshToken], doSignOut);

// router.get('/api/v1/users', fetchAllUsers);
router.get('/api/v1/users/:userId(\\d+)', [validateToken, auth, admin], fetchOneUser);

router.patch('/api/v1/users/:userId(\\d+)', [validateToken, auth], updateUser);
router.delete('/api/v1/users/:userId(\\d+)', [validateToken, auth], deleteUser);

router.post('/api/v1/refreshToken',[getRefreshToken], refreshToken);

//~ Export router
export { router };
