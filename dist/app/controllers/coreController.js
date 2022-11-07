import { ErrorApi } from '../services/errorHandler.js';
class CoreController {
    paramsHandler = async (req, res, elementId) => {
        const idVerified = +req.params[elementId];
        if (isNaN(idVerified))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        return idVerified;
    };
}
const coreController = new CoreController();
export { coreController };
//# sourceMappingURL=coreController.js.map