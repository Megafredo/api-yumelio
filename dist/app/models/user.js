import { CoreModel } from './coreModel.js';
import { User } from '../datamappers/index.js';
class UserModel extends CoreModel {
    infoNotFound = `User doesn't exist`;
    infoEmail = `Email already exist !`;
    infoEmailNotFound = `User unknown !`;
    emailExist = (email) => {
        return User.findUserIdentity(email);
    };
    createOneItem = (item) => {
        return User.create(item);
    };
    userFound = (userId) => {
        return User.findOne(userId);
    };
    updateOneItem = (item) => {
        return User.update(item);
    };
    deleteOneItem = (userId) => {
        return User.delete(userId);
    };
}
const userModel = new UserModel();
export { userModel };
//# sourceMappingURL=user.js.map