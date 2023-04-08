const { Sale, SaleProduct, sequelize } = require('../database/models');
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
      return mapError(e.message);
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

const getAll = async () => {
  const response = await Sale.findAll();
  
  if (!response) {
    return mapError('Internal Server Error');
  }
  return response;
};

const updateStatus = async (id, status) => {
    const sale = await Sale.findOne({ where: { id } });
  
    if (!sale) return mapError('Venda não encontrada');

    const [result] = await Sale.update({ status }, { where: { id } });

    if (result <= 0) return mapError('Não foi possível atualizar o status da venda');

    const updatedSale = await Sale.findOne({ where: { id } });
    
    return updatedSale;
};

module.exports = { create, getAll, updateStatus };
