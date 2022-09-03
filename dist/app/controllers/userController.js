import { ErrorApi } from '../services/errorHandler.js';
import { User } from '../datamappers/index.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';
import debug from 'debug';
const logger = debug('Controller');
async function doSignUp(req, res) {
    try {
        let { email, password, passwordConfirm } = req.body;
        const userExist = await User.findUser(email);
        if (userExist)
            throw new ErrorApi(`User already exist !`, req, res, 401);
        if (password !== passwordConfirm)
            throw new ErrorApi(`Not the same password`, req, res, 401);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        req.body.password = password;
        await User.create(req.body);
        return res.status(201).json(`User successfully created !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function doSignIn(req, res) {
    try {
        let { email, password } = req.body;
        const userExist = await User.findUser(email);
        if (!userExist)
            throw new ErrorApi(`User unknown !`, req, res, 401);
        const validPwd = await bcrypt.compare(password, userExist.password);
        if (!validPwd)
            throw new ErrorApi(`Email or password not valid !`, req, res, 401);
        const { ['password']: remove, ...user } = userExist;
        let accessToken = generateAccessToken({ user });
        let refreshToken = generateRefreshToken({ user }, req);
        let userIdentity = { ...user, accessToken, refreshToken };
        return res.status(200).json(userIdentity);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function doSignOut(req, res) {
    try {
        req.user = null;
        req.session.destroy();
        return res.status(204).json(`User disconnected !`);
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