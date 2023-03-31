const { Sale, SaleProduct, sequelize } = require('../database/models');
const { mapError } = require('../utils/errorMap');

const create = async ({ userId, sellerId, totalPrice, 
  deliveryAddress, deliveryNumber, saleDate, status, products }) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const newSale = await Sale.create(
        { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status }, 
        { transaction: t },
);
console.log(newSale.id);
      await SaleProduct.bulkCreate(products.map(({ productId, quantity }) => ({
          saleId: newSale.id, productId, quantity,
        })), { transaction: t });
        console.log(newSale);
        return newSale;
    } catch (e) {
      mapError(e);
    }
  });
  return result;
};

module.exports = { create };
