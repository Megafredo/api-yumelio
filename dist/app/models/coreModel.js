import { ErrorApi } from '../services/errorHandler.js';
class CoreModel {
    createItem = async (req, res) => {
        const result = await this.createOneItem(req.body);
        if (!result)
            throw new ErrorApi(this.infoNoDataFound, req, res, 400);
        return result;
    };
    fetchAllItems = async (req, res, id) => {
        const result = await this.itemsFound(id);
        if (!result)
            throw new ErrorApi(this.infoNotFound, req, res, 400);
        return result;
    };
    fetchOneItem = async (req, res, id, secondId) => {
        const result = await this.itemFound(id, secondId);
        if (!result)
            throw new ErrorApi(this.infoNotFound, req, res, 400);
        return result;
    };
    updateItem = async (req) => {
        const result = await this.updateOneItem(req.body);
        return result;
    };
    deleteItem = async (id) => {
        const result = await this.deleteOneItem(id);
        return result;
    };
    checkEmail = async (req, res, email) => {
        const result = await this.emailExist(email);
        if (result)
            throw new ErrorApi(this.infoEmail, req, res, 401);
    };
    fetchEmail = async (req, res, email) => {
        const result = await this.emailExist(email);
        if (!result)
            throw new ErrorApi(this.infoEmailNotFound, req, res, 400);
        return result;
    };
    fetchUser = async (req, res, id) => {
        const result = await this.userFound(id);
        if (!result)
            throw new ErrorApi(this.infoNotFound, req, res, 400);
        return result;
    };
}
export { CoreModel };
//# sourceMappingURL=coreModel.js.map