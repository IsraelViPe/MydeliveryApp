const { Sale, SaleProduct, sequelize, User, Product } = require('../database/models');
const { mapError } = require('../utils/errorMap');
const saleCreateSchema = require('./validations/schemas/SaleCreateSchema');

const createTransaction = async (saleInfo, products) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const newSale = await Sale.create(
        { ...saleInfo }, 
        { transaction: t },
);
console.log(newSale.id);
      await SaleProduct.bulkCreate(products.map(({ productId, quantity }) => ({
          saleId: newSale.id, productId, quantity,
        })), { transaction: t });
        console.log(newSale);
        return newSale;
    } catch (e) {
      return e;
    }
  });
  return result;
};

const create = async (sale) => {
  const { error } = saleCreateSchema.validate(sale);

  if (error) return mapError(error.message);

  const { userId, sellerId, totalPrice, deliveryAddress, 
    deliveryNumber, saleDate, status, products } = sale;

  const saleInfo = { userId, 
    sellerId, 
    totalPrice, 
    deliveryAddress, 
    deliveryNumber, 
    saleDate, 
    status };  
  
  const response = await createTransaction(saleInfo, products);
  
  if (response.message) {
  return mapError(response.message);
  }
  
  return response;
};

const getSales = async (id) => {
  const sales = await Sale.findAll({ where: { userId: id } });
  return { status: 200, message: sales };
};

const getSalesById = async (id) => {
  const sale = await Sale.findOne({
      where: { id },
      include: [{
          model: User,
          as: 'seller',
          attributes: ['name'],
      }, {
          model: Product, as: 'products',
      }],
  });
  return { status: 200, message: sale };
};

const updateSales = async (id) => {
  try {
      const updatedSale = await Sale.update({ status: 'entregue' }, { where: { id } });
      return { status: 200, message: updatedSale };
  } catch (error) {
      return { status: 400, message: { message: error } };
  }
};

module.exports = { 
  create,
  getSales,
  getSalesById,
  updateSales,
 };
