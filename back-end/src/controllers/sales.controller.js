const SaleService = require('../services/sales.service');
// const IndexService = require('../services/index.service');
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

const getOrdersById = async (req, res, next) => {
  const id = req.params;
  console.log(id);
  // const { authorization } = req.headers;

  // const response = await IndexService.tokenverify(authorization);
  // console.log(response);
  // if (response.statusCode) {
  //   next(response);
  //   return;
  // }

  const result = await SaleService.getOrdersById(id);

  if (result.statusCode) {
    next(result);
    return;
  }

  return res.status(codes.OK).json(result);
};

module.exports = { create, getOrdersById };
