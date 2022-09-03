import { ErrorApi } from '../services/errorHandler.js';
import { User } from '../datamappers/index.js';
import bcrypt from 'bcrypt';
import debug from 'debug';
const logger = debug('Controller');
async function doSignUp(req, res) {
    try {
        let { email, password, passwordConfirm } = req.body;
        const userExist = await User.findUser(email);
        if (userExist)
            throw new ErrorApi(`L'utilisateur existe déjà !`, req, res, 401);
        if (password !== passwordConfirm)
            throw new ErrorApi(`Les mots de passe ne sont pas identiques`, req, res, 401);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        req.body.password = password;
        await User.create(req.body);
        return res.status(201).json(`L'utilisateur a bien été créé`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function doSignIn(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function doSignOut(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function fetchAllUsers(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function fetchOneUser(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function updateUser(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function deleteUser(req, res) {
    try {
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { doSignUp, doSignIn, doSignOut, fetchAllUsers, fetchOneUser, updateUser, deleteUser };
//# sourceMappingURL=userController.js.map