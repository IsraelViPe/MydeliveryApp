const SaleService = require('../services/sales.service');
const { codes } = require('../utils/errorMap');

const create = async (req, res, next) => {
  const response = await SaleService.create(req.body);
  console.log(req.body);

  if (response.statusCode) {
    next(response);
    return;
  }
  return res.status(codes.CREATED).json(response);
};

module.exports = { create };
