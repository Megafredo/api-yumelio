import { ErrorApi } from '../services/errorHandler.js';
import { sendEmail } from '../services/nodemailerAuto.js';
import { coreController } from './coreController.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../services/jsonWebToken.js';
import debug from 'debug';
const logger = debug('Controller');
import { userModel } from '../models/index.js';
const doSignUp = async (req, res) => {
    try {
        let { email, password, passwordConfirm } = req.body;
        await userModel.checkEmail(req, res, email);
        if (password !== passwordConfirm)
            throw new ErrorApi(`Not the same password`, req, res, 401);
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        req.body.password = password;
        await userModel.createItem(req, res);
        await sendEmail.toUser(email, 'subscribe');
        return res.status(201).json(`User successfully created !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const doSignIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        const userExist = await userModel.fetchEmail(req, res, email);
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
};
const doSignOut = async (req, res) => {
    try {
        req.user = null;
        req.session.destroy();
        return res.status(204).json(`User disconnected !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchOneUser = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        const user = await userModel.fetchUser(req, res, userId);
        delete user['password'];
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateUser = async (req, res) => {
    try {
        let { email, password, passwordConfirm } = req.body;
        const userId = await coreController.paramsHandler(req, res, 'userId');
        await userModel.fetchUser(req, res, userId);
        await userModel.checkEmail(req, res, email);
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
        await userModel.updateItem(req);
        return res.status(200).json(`Informations successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        const userIdParams = await coreController.paramsHandler(req, res, 'userId');
        const user = await userModel.fetchUser(req, res, userIdParams);
        if (userId !== userIdParams && req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await userModel.deleteItem(userIdParams);
        req.user = null;
        req.session.destroy();
        await sendEmail.toUser(user.email, 'unsubscribe');
        return res.status(200).json(`User successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { doSignUp, doSignIn, doSignOut, fetchOneUser, updateUser, deleteUser };
//# sourceMappingURL=userController.js.map