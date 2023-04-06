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

const getSalesByCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { status, message } = await SaleService.getSalesByCustomer(id);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  create,
  getSalesByCustomer,
};
