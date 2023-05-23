import { CoreModel } from './coreModel.js';
import { User } from '../datamappers/index.js';

class UserModel extends CoreModel {
  //& Properties
  infoNotFound = `User doesn't exist`;
  infoEmail = `Email already exist !`;
  infoEmailNotFound = `User unknown !`;

  //& Methods
  emailExist = (email: string) => {
    return User.findUserIdentity(email);
  };

  createOneItem = (item: object) => {
    return User.create(item);
  };

  userFound = (userId: number) => {
    return User.findOne(userId);
  };

  updateOneItem = (item: object) => {
    return User.update(item);
  };

  deleteOneItem = (userId: number) => {
    return User.delete(userId);
  };
}

const userModel = new UserModel();
export { userModel };