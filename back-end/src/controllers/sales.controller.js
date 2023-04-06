const SaleService = require('../services/sales.service');
const { codes } = require('../utils/errorMap');

const create = async (req, res, next) => {
  const createInfo = { userId: +req.user, ...req.body };
  console.log(createInfo);
  const response = await SaleService.create(createInfo);

  if (response.statusCode) {
    next(response);
    return;
  }
  return res.status(codes.CREATED).json(response);
};

const getAll = async (_req, res, next) => {
  const response = await SaleService.getAll();

  if (response.statusCode) {
    next(response);
    return;
  }
  return res.status(codes.OK).json(response);
};

module.exports = { create, getAll };
