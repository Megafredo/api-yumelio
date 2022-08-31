import debug from 'debug';
const logger = debug('Controller');
function renderHomePage(req, res) {
    try {
        res.json({
            message: 'Welcome to Yumelio API'
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { renderHomePage };
//# sourceMappingURL=mainController.js.map