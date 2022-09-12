import { ErrorApi } from '../services/errorHandler.js';
import { User } from '../datamappers/index.js';
import { sendEmail } from '../services/nodemailerAuto.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';
import debug from 'debug';
const logger = debug('Controller');
async function doSignUp(req, res) {
    try {
        let { email, password, passwordConfirm } = req.body;
        const userExist = await User.findUserIdentity(email);
        if (userExist)
            throw new ErrorApi(`User already exist !`, req, res, 401);
        if (password !== passwordConfirm)
            throw new ErrorApi(`Not the same password`, req, res, 401);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        req.body.password = password;
        await sendEmail.toUser(email, 'subscribe');
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
        const userExist = await User.findUserIdentity(email);
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
async function fetchOneUser(req, res) {
    try {
        const userId = +req.params.userId;
        if (isNaN(userId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const user = await User.findOne(userId);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        delete user['password'];
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function updateUser(req, res) {
    try {
        let { password, passwordConfirm } = req.body;
        const userId = +req.params.userId;
        if (isNaN(userId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const user = await User.findOne(userId);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const userExist = await User.findUserIdentity(req.body.email);
        if (userExist)
            throw new ErrorApi(`Email already exist !`, req, res, 401);
        if (password) {
            if (password !== passwordConfirm)
                throw new ErrorApi(`Not the same password !`, req, res, 401);
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            req.body.password = password;
        }
        if (req.user?.id !== userId)
            throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
        req.body = { ...req.body, id: userId };
        await User.update(req.body);
        return res.status(200).json(`Informations successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function deleteUser(req, res) {
    try {
        const userId = +req.params.userId;
        if (isNaN(userId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const user = await User.findOne(userId);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const isUser = req.user?.id;
        if (isUser === userId || req.user?.role === 'admin') {
            await User.delete(userId);
            req.user = null;
            req.session.destroy();
            return res.status(200).json(`User successfully deleted`);
        }
        else
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser };
//# sourceMappingURL=userController.js.map