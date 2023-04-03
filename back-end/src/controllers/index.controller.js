const IndexService = require('../services/index.service');

const tokenverify = async (req, res, next) => {
    const { authorization } = req.headers;
    const response = await IndexService.tokenverify(authorization);
    if (response.statusCode) {
        next(response);
        return;
    }
    res.status(200).json(response);
};

module.exports = { tokenverify };