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

const getSales = async (req, res, next) => {
  try {
    const { status, message } = await SaleService.getSales(req.params.id);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const getSalesById = async (req, res, next) => {
  const { idVenda } = req.params;
  try {
    const { status, message } = await SaleService.getById(idVenda);
    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};

const updateSales = async (req, res, next) => {
  const { idVenda } = req.params;
  try {
    const { status } = await SaleService.updateSales(idVenda);
    res.status(status).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  create,
  getSales,
  getSalesById,
  updateSales,
};
