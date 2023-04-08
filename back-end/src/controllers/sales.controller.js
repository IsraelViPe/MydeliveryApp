const SaleService = require('../services/sales.service');
const { codes } = require('../utils/errorMap');

const create = async (req, res, next) => {
  const createInfo = { userId: +req.user, ...req.body };
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

const updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  const response = await SaleService.updateStatus(id, status);
  if (response.statusCode) { 
    next(response);
}
  res.status(codes.OK).json(response);
};

const getSalesByCustomer = async (req, res, next) => {
  const id = req.user;
  try {
    const { status, message } = await SaleService.getSalesByCustomer(+id);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const getSalesBySeller = async (req, res, next) => {
  const id = req.user;
  try {
    const { status, message } = await SaleService.getSalesBySeller(+id);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getSalesByCustomer, getSalesBySeller, updateStatus };
