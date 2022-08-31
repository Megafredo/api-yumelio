//~ Import Router
import { Router } from 'express';
const router = Router();

import { doSignUp, doSignIn, doSignOut, fetchAllUsers, fetchOneUser, updateUser, deleteUser } from '../controllers/userController.js';

//~ Home
router.post('/api/v1/signup', doSignUp);
router.post('/api/v1/signin', doSignIn);
router.get('/api/v1/signout', doSignOut);

// router.get('/api/v1/users', fetchAllUsers);
router.get('/api/v1/users/:userId', fetchOneUser);

router.patch('/api/v1/users/:userId', updateUser);
router.delete('/api/v1/users/:userId', deleteUser);


//~ Export router
export { router };
