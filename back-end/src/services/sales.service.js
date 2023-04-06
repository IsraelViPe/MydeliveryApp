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

const getOrdersById = async (id) => {
  // const userId = id;

  const orders = await Sale.findAll({
    where: { userId: id },
  });

  if (!orders) return mapError('Usuário não encontrado');

  return orders;
};

// const getById = async (id) => {
//   const [post] = await BlogPost.findAll({
//     where: { id },
//     include: [{ model: Category, as: 'categories' },
//     { model: User, as: 'user', attributes: { exclude: ['password'] } }] });
//   if (!post) {
//     return {
//       statusCode: 404,
//       message: {
//         message: 'Post does not exist',
//       },
//     };
//   }
module.exports = { create, getOrdersById };
